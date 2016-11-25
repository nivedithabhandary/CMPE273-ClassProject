from flask import Flask
from .views.sample import sample
from .views.planner import planner
from .views.oauth import oauth

app = Flask(__name__)
app.register_blueprint(sample)
app.register_blueprint(planner)
app.register_blueprint(oauth)
