from flask import Blueprint
from flask import render_template,current_app
from flask import make_response

planner = Blueprint('planner', __name__,template_folder='templates',static_folder='static')


@planner.route('/dummy')
def dummy():
    # Do some stuff
    return "Dummy Call"


@planner.route('/')
def index():
    # Do some stuff
    print ("Inside Main")
    #return current_app.send_static_file('index.html');
    return render_template('index.html');

@planner.route('/dummybestrouteapi',methods =['POST'])
def bestroute():
    pass;

@planner.route('/userpage')
def userpage():
    print ("Inside User Page")
    resp = make_response(current_app.send_static_file('userindex.html'))
    resp.set_cookie('username', 'the username')
    return resp
