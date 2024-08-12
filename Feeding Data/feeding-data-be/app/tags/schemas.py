from marshmallow import Schema, fields


class TagSchema(Schema):
    tag_id = fields.Integer()
    tag_name = fields.String()
    slug = fields.String()
