from flask import Flask, jsonify
from app.extensions import db, jwt
from app.controllers.auth import auth_bp
from app.controllers.users import user_bp
from app.controllers.job import job_bp
from app.models.user import User

def create_app():
    app = Flask(__name__)
    app.config.from_prefixed_env()
    
    # initial exts
    db.init_app(app)
    jwt.init_app(app)
    
    # register blueprints
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(user_bp, url_prefix='/users')
    app.register_blueprint(job_bp, url_prefix='/jobs')
    
    # load user
    @jwt.user_lookup_loader
    def user_lookup_callback(_jwt_headers, jwt_data):
        identity = jwt_data['sub']
        return User.query.filter_by(username = identity).one_or_none()
    
    # jwt error handlers
    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_data):
        return jsonify({"message": "Token has expired", "error": "token_expired"}), 401
    
    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        return jsonify({"message": "Signature verification failed", "error": "invalid_token"}), 401
    
    @jwt.unauthorized_loader
    def missing_token_callback(error):
        return jsonify({"message": "Request doesn't contain valid token", "error": "authorization_header"})
    
    return app