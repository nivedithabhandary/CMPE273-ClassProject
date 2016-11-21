#Run this file to start the application 
#python runserver.py 
# Application can be accessed at localhost:5000 

from flask import Flask, render_template
from tripplanner import app

app.run(debug=True)