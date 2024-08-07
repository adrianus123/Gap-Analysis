from flask import Flask
from app.extensions import db
from app.jobs.controllers import job_bp


def create_app():
    app = Flask(__name__)
    app.config.from_prefixed_env()

    # initial exts
    db.init_app(app)

    # register blueprints
    app.register_blueprint(job_bp, url_prefix="/jobs")

    return app
