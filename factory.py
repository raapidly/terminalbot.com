def create_app():
    """
    Application factory.

    :return: Flask object
    """
    from dotenv import dotenv_values
    from flask import Flask
    from flask_minify import minify
    from flask_session import Session

    config = dotenv_values('.env')
    app = Flask(import_name=__name__)
    app.config.from_object(obj=config)
    Session(app=app)
    minify(
        app=app,
        caching_limit=3,
        passive=True)

    return app
