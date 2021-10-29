from flask import Blueprint, render_template
from flask_minify.decorators import minify

blueprint = Blueprint(
    name='home',
    import_name=__name__)


@blueprint.route(rule='/', methods=['get'])
@minify(html=True, js=True)
def index():
    return render_template(template_name_or_list='home/index.html')
