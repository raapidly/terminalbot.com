def create_app():
    """
    Application factory.

    :return: Flask object
    """
    from flask import Flask, send_from_directory
    from config import DevelopmentConfig as Config

    app = Flask(import_name=__name__)
    app.config.from_object(obj=Config)

    def favicon():
        return send_from_directory(directory='static', path='favicon.ico')

    app.add_url_rule(rule='/favicon.ico', view_func=favicon)

    return app
