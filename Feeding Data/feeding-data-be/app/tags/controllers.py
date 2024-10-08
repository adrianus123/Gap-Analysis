from flask import Blueprint, jsonify
from app.tags.models import Tag
from app.tags.schemas import TagSchema

tag_bp = Blueprint("tags", __name__)


@tag_bp.get("/")
def get_tags():
    tags = Tag.query.all()

    if not tags:
        return jsonify({"message": "Tags not found"}), 404

    result = TagSchema().dump(tags, many=True)

    return jsonify({"data": result}), 200
