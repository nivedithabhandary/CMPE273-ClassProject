from flask import Flask
from .views.sample import sample

app = Flask(__name__)
app.register_blueprint(sample)