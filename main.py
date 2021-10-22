from blueprints.dashboard import dashboard_blueprint
from blueprints.login import login_blueprint
from factory import create_app

"""
Object initialization in application context.
"""
app = create_app()

"""
Bluprint registration
"""
app.register_blueprint(
    blueprint=dashboard_blueprint,
    url_prefix='/')
app.register_blueprint(
    blueprint=login_blueprint,
    url_prefix='/login')
