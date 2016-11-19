#Run this file to start the application 
#python runserver.py 
# Application can be accessed at localhost:5000 

from flask import Flask, render_template
from tripplanner import app
#import os
#import jinja2

#app = Flask(__name__)
#app.jinja_loader = jinja2.FileSystemLoader('/tripplanner/templates')

#tbd for / routing
@app.route('/')
def hello_world():
    return 'Hello, User!'

#the first page to login to the application
#add authentication methods
@app.route('/login')
def login():
    return render_template('login.html')

#main page of the application
@app.route('/home')
def home():
    return render_template('home.html')    

#Locations page 
@app.route('/locations')
def locations():
    return render_template('locations.html')    

app.run(debug=True)