from flask import Flask
from flask_cors import CORS
from app.extensions import db
from app.jobs.controllers import job_bp
from app.tags.controllers import tag_bp


def create_app():
    app = Flask(__name__)
    app.config.from_prefixed_env()

    # cors
    CORS(app)

    # initial exts
    db.init_app(app)

    # register blueprints
    app.register_blueprint(job_bp, url_prefix="/jobs")
    app.register_blueprint(tag_bp, url_prefix="/tags")

    return app
