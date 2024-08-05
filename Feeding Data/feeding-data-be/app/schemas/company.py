from marshmallow import Schema, fields

class CompanySchema(Schema):
    company_id = fields.Integer()
    company_name = fields.String()