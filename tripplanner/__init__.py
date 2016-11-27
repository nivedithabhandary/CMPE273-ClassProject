from flask import Flask
from .views.sample import sample
from .views.planner import planner
from .views.oauth import oauth
from .views.plannerapi import plannerapi
from .views.plannerapi import set_mongo_handle
from .views.locationapi import locationapi
from .views.locationapi import set_mongo_handler
from flask.ext.pymongo import PyMongo

app = Flask(__name__)
app.config['MONGO_DBNAME'] = 'restdb'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/restdb'
app.config.from_object('config')
mongo = PyMongo()
mongo.init_app(app)

app.register_blueprint(sample)
app.register_blueprint(planner)
app.register_blueprint(oauth)
app.register_blueprint(plannerapi)
app.register_blueprint(locationapi)

set_mongo_handle(mongo)
set_mongo_handler(mongo)
