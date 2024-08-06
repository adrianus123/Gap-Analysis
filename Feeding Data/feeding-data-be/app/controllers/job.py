from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, current_user
from app.models.job import Job
from app.schemas.jobs import JobSchema, LocationSchema, JobTypeSchema

job_bp = Blueprint("jobs", __name__)


@job_bp.get("/")
def get_jobs():
    page = request.args.get("page", default=1, type=int)
    per_page = request.args.get("per_page", default=5, type=int)
    keyword = request.args.get("keyword", default="", type=str)
    location = request.args.get("location", default="", type=str)
    job_type = request.args.get("job_type", default="", type=str)

    query = Job.query

    if keyword:
        query = query.filter(
            (Job.title.ilike(f"%{keyword}%")) | (Job.description.ilike(f"%{keyword}%"))
        )

    if location:
        query = query.filter(Job.location.ilike(f"%{location}%"))

    if job_type:
        query = query.filter(Job.job_type.ilike(f"%{job_type}%"))

    jobs = query.paginate(page=page, per_page=per_page)

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
@jwt_required()
def get_job(id):
    job_id = request.view_args["id"]

    job = Job.get_job_by_id(job_id=job_id)
    result = JobSchema().dump(job)

    return jsonify({"data": result}), 200


@job_bp.post("/add")
@jwt_required()
def create_job():
    if current_user.role != "employer":
        return jsonify({"message": "Unauthorized access..."}), 403

    data = request.get_json()

    new_job = Job(
        title=data.get("title"),
        description=data.get("description"),
        requirements=data.get("requirements"),
        location=data.get("location"),
        salary=data.get("salary"),
        job_type=data.get("job_type"),
        employee=current_user,
    )

    new_job.add()

    return jsonify({"message": "Job created..."}), 201


@job_bp.put("/<id>")
@jwt_required()
def edit_job(id):
    if current_user.role != "employer":
        return {"message": "Unauthorized access..."}, 403

    job_id = request.view_args["id"]
    data = request.get_json()

    job = Job.get_job_by_id(job_id=job_id)
    if not job:
        return {"message": "Job not found"}, 404

    job.title = data["title"]
    job.description = data["description"]
    job.requirements = data["requirements"]
    job.location = data["location"]
    job.salary = data["salary"]
    job.job_type = data["job_type"]

    job.update()

    return {"message": "Job updated successfully"}, 200


@job_bp.delete("/<id>")
@jwt_required()
def delete_job(id):
    if current_user.role != "employer":
        return ({"message": "Unauthorized access..."}), 403

    job_id = request.view_args["id"]
    job = Job.get_job_by_id(job_id=job_id)

    if not job:
        return ({"message": "Job not found..."}), 404
    job.delete()

    return ({"message": "Job deleted..."}), 204


@job_bp.get("/location")
def get_job_location():
    location = Job.get_job_location()
    result = LocationSchema().dump(location, many=True)
    return jsonify({"data": result}), 200


@job_bp.get("/type")
def get_job_type():
    job_type = Job.get_job_type()
    result = JobTypeSchema().dump(job_type, many=True)
    return jsonify({"data": result}), 200
