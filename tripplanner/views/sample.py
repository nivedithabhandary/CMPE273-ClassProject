from flask import Blueprint

sample = Blueprint('sample', __name__)


#profile = Blueprint('profile', __name__,
#                    template_folder='templates',
#                    static_folder='static')

@sample.route('/hello')
def hello():
    # Do some stuff
    return "Hello , It's a sample page"