from blueprints import dashboard, home, login
from factory import create_app

"""
Object initialization in application context.
"""
app = create_app()

"""
Bluprint registration
"""
app.register_blueprint(
    blueprint=home.blueprint,
    url_prefix='/')

app.register_blueprint(
    blueprint=dashboard.blueprint,
    url_prefix='/dashboard')

app.register_blueprint(
    blueprint=login.blueprint,
    url_prefix='/login')
