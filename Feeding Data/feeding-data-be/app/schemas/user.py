from marshmallow import fields, Schema
from app.schemas.company import CompanySchema

class UserSchema(Schema):
    user_id = fields.Integer()
    username = fields.String()
    email = fields.String()
    full_name = fields.String()
    role = fields.String()
    company = fields.Nested(CompanySchema)