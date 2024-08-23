from marshmallow import Schema, fields, validate


class JobSchema(Schema):
    job_id = fields.Integer()
    title = fields.String(
        required=True, validate=validate.Length(min=1, error="Title cannot be empty")
    )
    company = fields.String(
        required=True,
        validate=validate.Length(min=1, error="Company name cannot be empty"),
    )
    teaser = fields.String()
    location = fields.String(
        required=True, validate=validate.Length(min=1, error="Location cannot be empty")
    )
    salary = fields.String()
    job_type = fields.String(
        required=True, validate=validate.Length(min=1, error="Job type cannot be empty")
    )
    workplace = fields.String()
    bullet_points = fields.String()
    classification = fields.String(
        required=True,
        validate=validate.Length(min=1, error="Classification cannot be empty"),
    )
    sub_classification = fields.String(
        required=True,
        validate=validate.Length(min=1, error="Sub classification cannot be empty"),
    )
    listing_date = fields.DateTime()
    keyword = fields.String(data_key="tag")


class LocationSchema(Schema):
    location = fields.String()


class JobTypeSchema(Schema):
    job_type = fields.String()


class ClassificationSchema(Schema):
    classification = fields.String()


class SubClassificationSchema(Schema):
    sub_classification = fields.String()
