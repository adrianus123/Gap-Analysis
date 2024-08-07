from app.extensions import db
from datetime import datetime


class Job(db.Model):
    __tablename__ = "jobs"
    job_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(), nullable=False)
    company = db.Column(db.String(), nullable=False)
    teaser = db.Column(db.Text(), nullable=True)
    location = db.Column(db.String(), nullable=False)
    salary = db.Column(db.String(), nullable=True)
    job_type = db.Column(db.String(), nullable=False)
    workplace = db.Column(db.String(), nullable=True)
    bullet_points = db.Column(db.Text(), nullable=True)
    classification = db.Column(db.String(), nullable=True)
    sub_classification = db.Column(db.String(), nullable=True)
    keyword = db.Column(db.String(), nullable=False)
    listing_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f"<Job {self.title}>"

    @classmethod
    def get_job_by_id(cls, job_id):
        return cls.query.filter_by(job_id=job_id).first()

    @classmethod
    def get_job_location(cls):
        return cls.query.distinct(cls.location).all()

    @classmethod
    def get_job_type(cls):
        return cls.query.distinct(cls.job_type).all()

    def add(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()
        
    def rollback(self):
        db.session.rollback()
