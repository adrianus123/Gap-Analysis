from flask import Blueprint, request, jsonify, send_file
from app.jobs.models import Job
from app.jobs.schemas import (
    JobSchema,
    LocationSchema,
    JobTypeSchema,
    ClassificationSchema,
    SubClassificationSchema,
)
from io import BytesIO
from datetime import date, datetime
from bs4 import BeautifulSoup
import xlsxwriter
import requests
import json
import re

job_bp = Blueprint("jobs", __name__)


def get_server_state(url):
    response = requests.get(url=url)
    soup = BeautifulSoup(response.content, "html.parser")
    server_state = soup.find(attrs={"data-automation": "server-state"})
    return server_state.get_text(strip=True) if server_state else None


def get_workplace(obj):
    workplace = []
    if len(obj) > 0:
        for o in obj:
            label = o.get("label")
            if label and "text" in label:
                workplace.append(label["text"])

    return workplace


def get_timestamp(str):
    dt = datetime.strptime(str, "%Y-%m-%dT%H:%M:%SZ")
    formatted_date = dt.strftime("%Y-%m-%d %H:%M:%S.%f")

    return formatted_date


@job_bp.get("/generate/<keyword>")
def generate_jobs(keyword):
    tag = request.view_args["keyword"]
    url = f"https://id.jobstreet.com/id/{tag}-jobs"
    dump_data = get_server_state(url)

    result = dump_data.split("\n")
    match = re.search(r"window\.SEEK_REDUX_DATA\s*=\s*(\{.*\});", result[1])
    if not match:
        return jsonify({"message": "JSON object not found"}), 404

    json_str = match.group(1)
    data = json.loads(json_str)
    jobs = data["results"]["results"]["jobs"]

    for job in jobs:
        data = Job.get_job_by_key(job["id"])
        if not data:
            workplace = get_workplace(job["workArrangements"]["data"])
            bullet_points = job["bulletPoints"]
            timestamp = get_timestamp(job["listingDate"])

            new_job = Job(
                title=job["title"],
                company=job["advertiser"]["description"],
                teaser=job["teaser"],
                location=job["jobLocation"]["label"],
                salary=job["salary"],
                job_type=job["workType"],
                workplace=";".join(workplace),
                bullet_points=";".join(bullet_points),
                classification=job["classification"]["description"],
                sub_classification=job["subClassification"]["description"],
                keyword=tag,
                listing_date=timestamp,
                key=job["id"],
            )

            new_job.add()

    return jsonify({"message": "Get data successfully"}), 200


@job_bp.get("/")
def get_jobs():
    page = request.args.get("page", default=1, type=int)
    per_page = request.args.get("per_page", default=5, type=int)
    keyword = request.args.get("keyword", default="", type=str)
    location = request.args.get("location", default="", type=str)
    job_type = request.args.get("job_type", default="", type=str)
    tag = request.args.get("tag", default="", type=str)

    query = Job.query

    if keyword:
        query = query.filter(
            (Job.title.ilike(f"%{keyword}%")) | (Job.company.ilike(f"%{keyword}%"))
        )

    if location:
        query = query.filter(Job.location.ilike(f"%{location}%"))

    if job_type:
        query = query.filter(Job.job_type.ilike(f"%{job_type}%"))

    if tag:
        query = query.filter(Job.keyword.ilike(f"%{tag}%"))

    jobs = query.order_by(Job.listing_date.desc()).paginate(
        page=page, per_page=per_page
    )

    if not jobs:
        return jsonify({"message": "Jobs not found"}), 404

    result = JobSchema().dump(jobs, many=True)

    return (
        jsonify(
            {
                "data": result,
                "total_data": jobs.total,
                "total_pages": jobs.pages,
                "current_page": jobs.page,
            }
        ),
        200,
    )


@job_bp.get("/<id>")
def get_job(id):
    job_id = request.view_args["id"]

    job = Job.get_job_by_id(job_id=job_id)
    result = JobSchema().dump(job)

    return jsonify({"data": result}), 200


@job_bp.post("/add")
def create_job():
    data = request.get_json()
    new_job = Job(
        title=data.get("title"),
        company=data.get("company"),
        teaser=data.get("teaser"),
        location=data.get("location"),
        salary=data.get("salary"),
        job_type=data.get("job_type"),
        workplace=data.get("workplace"),
        bullet_points=data.get("bullet_points"),
        classification=data.get("classification"),
        sub_classification=data.get("sub_classification"),
        keyword=data.get("tag"),
        listing_date=datetime.now(),
    )

    try:
        new_job.add()
        return jsonify({"message": "Job created"}), 201

    except Exception as e:
        new_job.rollback()
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


@job_bp.put("/<id>")
def edit_job(id):
    job_id = request.view_args["id"]
    data = request.get_json()

    job = Job.get_job_by_id(job_id=job_id)
    if not job:
        return {"message": "Job not found"}, 404

    job.title = data.get("title")
    job.company = data.get("company")
    job.teaser = data.get("teaser")
    job.location = data.get("location")
    job.salary = data.get("salary")
    job.job_type = data.get("job_type")
    job.workplace = data.get("workplace")
    job.bullet_points = data.get("bullet_points")
    job.classification = data.get("classification")
    job.sub_classification = data.get("sub_classification")
    job.keyword = data.get("tag")

    try:
        job.update()
        return jsonify({"message": "Job updated successfully"}), 200
    except Exception as e:
        job.rollback()
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


@job_bp.delete("/<id>")
def delete_job(id):
    job_id = request.view_args["id"]

    try:
        job = Job.get_job_by_id(job_id=job_id)

        if not job:
            return ({"message": "Job not found"}), 404
        job.delete()

        return jsonify({"message": "Job deleted"}), 200
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


@job_bp.get("/download")
def download():
    keyword = request.args.get("keyword", default="", type=str)
    location = request.args.get("location", default="", type=str)
    job_type = request.args.get("job_type", default="", type=str)
    tag = request.args.get("tag", default="", type=str)

    query = Job.query

    if keyword:
        query = query.filter(Job.title.ilike(f"%{keyword}%"))

    if location:
        query = query.filter(Job.location.ilike(f"%{location}%"))

    if job_type:
        query = query.filter(Job.job_type.ilike(f"%{job_type}%"))

    if tag:
        query = query.filter(Job.keyword.ilike(f"%{tag}%"))

    jobs = query.order_by(Job.listing_date.desc())

    output = BytesIO()
    workbook = xlsxwriter.Workbook(output, {"in_memory": True})
    worksheet = workbook.add_worksheet()

    headers = [
        "No",
        "Title",
        "Company",
        "Teaser",
        "Location",
        "Salary",
        "Job Type",
        "Workplace",
        "Bullet Points",
        "Classification",
        "Sub Classification",
        "Listing Date",
    ]

    for col_num, header in enumerate(headers):
        worksheet.write(0, col_num, header)

    for row_num, job in enumerate(jobs, start=1):
        worksheet.write(row_num, 0, row_num)
        worksheet.write(row_num, 1, job.title)
        worksheet.write(row_num, 2, job.company)
        worksheet.write(row_num, 3, job.teaser)
        worksheet.write(row_num, 4, job.location)
        worksheet.write(row_num, 5, job.salary)
        worksheet.write(row_num, 6, job.job_type)
        worksheet.write(row_num, 7, job.workplace)
        worksheet.write(row_num, 8, job.bullet_points)
        worksheet.write(row_num, 9, job.classification)
        worksheet.write(row_num, 10, job.sub_classification)
        worksheet.write(row_num, 11, job.listing_date.strftime("%Y-%m-%d %H:%M:%S"))

    workbook.close()
    output.seek(0)

    return send_file(
        output, download_name=f"Jobs_{date.today()}.xlsx", as_attachment=True
    )


@job_bp.get("/location")
def get_job_location():
    location = Job.get_job_location()
    if not location:
        return jsonify({"message": "Locations not found"}), 404

    result = LocationSchema().dump(location, many=True)
    return jsonify({"data": result}), 200


@job_bp.get("/type")
def get_job_type():
    job_type = Job.get_job_type()

    if not job_type:
        return jsonify({"message": "Job types not found"}), 404

    result = JobTypeSchema().dump(job_type, many=True)
    return jsonify({"data": result}), 200


@job_bp.get("/classification")
def get_classification():
    classification = Job.get_classification()
    if not classification:
        return jsonify({"message": "Classifications not found"}), 404

    result = ClassificationSchema().dump(classification, many=True)
    return jsonify({"data": result})


@job_bp.get("/sub-classification")
def get_sub_classification():
    sub_classification = Job.get_sub_classification()
    if not sub_classification:
        return jsonify({"message": "Sub Classifications not found"}), 404

    result = SubClassificationSchema().dump(sub_classification, many=True)
    return jsonify({"data": result})
