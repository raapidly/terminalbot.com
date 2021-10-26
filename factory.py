def create_app():
    """
    Application factory.

    :return: Flask object
    """
    from flask import Flask
    from flask_minify import minify
    from config import DevelopmentConfig as Config

    app = Flask(import_name=__name__)
    app.config.from_object(obj=Config)
    minify(
        app=app,
        caching_limit=1,
        passive=True)

    return app
