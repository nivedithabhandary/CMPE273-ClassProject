from flask import Flask
from .views.sample import sample
from .views.planner import planner

app = Flask(__name__)
app.register_blueprint(sample)
app.register_blueprint(planner)