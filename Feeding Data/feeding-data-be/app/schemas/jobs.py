from marshmallow import Schema, fields
from app.schemas.user import UserSchema

class JobSchema(Schema):
    job_id = fields.Integer()
    title = fields.String()
    description = fields.String()
    requirements = fields.String()
    location = fields.String()
    salary = fields.Integer()
    job_type = fields.String()
    employee = fields.Nested(UserSchema)
    
class LocationSchema(Schema):
    location = fields.String()
    
class JobTypeSchema(Schema):
    job_type = fields.String()