def create_app():
    """
    Application factory.

    :return: Flask object
    """
    from flask import Flask
    from flask_minify import minify
    from flask_session import Session
    from redis import StrictRedis

    app = Flask(import_name=__name__)
    app.config.from_json(filename='config.json')
    app.config.update({
        'SESSION_REDIS': StrictRedis(
            host=app.config.get('SESSION_REDIS_HOST'),
            port=app.config.get('SESSION_REDIS_PORT'),
            db=app.config.get('SESSION_REDIS_DB'),
            password=app.config.get('SESSION_REDIS_PASSWORD'))
    })

    Session(app=app)
    minify(
        app=app,
        caching_limit=3,
        passive=True)

    return app
