def create_app():
    """
    Application factory.

    :return: Flask object
    """
    from flask import Flask
    from flask_minify import minify
    from flask_session import Session

    app = Flask(import_name=__name__)
    app.config.from_json(filename='config.json')
    Session(app=app)
    minify(
        app=app,
        caching_limit=3,
        passive=True)

    return app
