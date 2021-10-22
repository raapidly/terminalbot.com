from flask import Blueprint, render_template

login_blueprint = Blueprint(
    name='login',
    import_name=__name__,
    template_folder='templates')


@login_blueprint.route(rule='/', methods=['get'])
def index():
    return render_template('index.html')
