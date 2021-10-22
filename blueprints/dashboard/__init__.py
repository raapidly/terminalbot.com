from flask import Blueprint, render_template

dashboard_blueprint = Blueprint(
    name='dashboard',
    import_name=__name__,
    template_folder='templates')


@dashboard_blueprint.route(rule='/', methods=['get'])
def index():
    return render_template(template_name_or_list='index.html')
