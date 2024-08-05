from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, current_user
from app.models.user import User
from app.schemas.user import UserSchema

user_bp = Blueprint('users', __name__)

@user_bp.get('/')
@jwt_required()
def get_users():
    if current_user.role == "admin":
        page = request.args.get('page', default=1, type=int)
        per_page = request.args.get('per_page', default=5, type=int)
        
        users = User.query.paginate(
            page = page,
            per_page = per_page
        )
        
        result = UserSchema().dump(users, many=True)
        
        return jsonify({
            "data": result,
        }), 200
        
    return jsonify({"message": "You not have access..."}), 401