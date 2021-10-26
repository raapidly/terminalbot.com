def create_app():
    """
    Application factory.

    :return: Flask object
    """
    from flask import Flask, send_from_directory
    from config import DevelopmentConfig as Config

    app = Flask(import_name=__name__)
    app.config.from_object(obj=Config)

    @app.route('/site.webmanifest', methods=['GET'])
    def webmanifest():
        return send_from_directory(
            directory='assets',
            path='site.webmanifest')

    @app.route('/favicon.ico', methods=['GET'])
    def favicon():
        return send_from_directory(
            directory='assets',
            path='img/favicon.ico')

    @app.route('/favicon-16x16.png', methods=['GET'])
    def favicon_16():
        return send_from_directory(
            directory='assets',
            path='img/favicon-16x16.png')

    @app.route('/favicon-32x32.png', methods=['GET'])
    def favicon_32():
        return send_from_directory(
            directory='assets',
            path='img/favicon-32x32.png')

    @app.route('/android-chrome-192x192.png', methods=['GET'])
    def favicon_android_chrome_192():
        return send_from_directory(
            directory='assets',
            path='img/android-chrome-192x192.png')

    @app.route('/android-chrome-512x512.png', methods=['GET'])
    def favicon_android_chrome_512():
        return send_from_directory(
            directory='assets',
            path='img/android-chrome-512x512.png')

    @app.route('/apple-touch-icon.png', methods=['GET'])
    def favicon_apple_touch_icon():
        return send_from_directory(
            directory='assets',
            path='img/apple-touch-icon.png')

    return app
