def create_app():
    from flask import Flask
    from config import DevelopmentConfig as Config

    app = Flask(import_name=__name__)
    app.config.from_object(obj=Config)

    return app
