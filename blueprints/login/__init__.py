from flask import Blueprint, render_template

blueprint = Blueprint(
    name='login',
    import_name=__name__)


@blueprint.route(rule='/', methods=['get'])
def index():
    return render_template(template_name_or_list='login/index.html')
