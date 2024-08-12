from marshmallow import Schema, fields


class JobSchema(Schema):
    job_id = fields.Integer()
    title = fields.String()
    company = fields.String()
    teaser = fields.String()
    location = fields.String()
    salary = fields.String()
    job_type = fields.String()
    workplace = fields.String()
    bullet_points = fields.String()
    classification = fields.String()
    sub_classification = fields.String()
    listing_date = fields.DateTime()


class LocationSchema(Schema):
    location = fields.String()


class JobTypeSchema(Schema):
    job_type = fields.String()


class ClassificationSchema(Schema):
    classification = fields.String()


class SubClassificationSchema(Schema):
    sub_classification = fields.String()
