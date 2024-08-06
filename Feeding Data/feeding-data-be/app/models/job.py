from app.extensions import db


class Job(db.Model):
    __tablename__ = "jobs"
    job_id = db.Column(db.Integer, primary_key=True)
    employer_id = db.Column(db.Integer, db.ForeignKey("users.user_id"), nullable=False)
    title = db.Column(db.String(), nullable=False)
    description = db.Column(db.Text(), nullable=False)
    requirements = db.Column(db.Text(), nullable=False)
    location = db.Column(db.String(), nullable=False)
    salary = db.Column(db.Integer, nullable=False)
    job_type = db.Column(db.String(), nullable=False)
    employee = db.relationship("User", back_populates="jobs")

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
