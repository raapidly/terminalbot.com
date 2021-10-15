from flask import Flask

from config import DevelopmentConfig as Config


def create_app():
    app = Flask(import_name=__name__)
    app.config.from_object(obj=Config)
    return app
