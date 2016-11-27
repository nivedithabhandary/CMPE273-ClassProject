from flask import Flask, redirect, url_for, session, jsonify, request
from flask_pymongo import PyMongo
from flask import Blueprint
import simplejson as json
import requests

plannerapi = Blueprint('plannerapi', __name__)

g_mongo_handle = None
def set_mongo_handle(mongo_handle):
    global g_mongo_handle
    g_mongo_handle = mongo_handle

@plannerapi.route('/trips', methods=['POST'])
def add_trip():
  global g_mongo_handle
  trip = g_mongo_handle.db.trips
  startlocation = request.json['startlocation']
  endlocation = request.json['endlocation']
  vialocation = request.json['vialocation']

  #Call api to find best route
  #Call api to get Lyft and Uber prices

  #dummy best route and prices
  best_route = vialocation
  providers = [
        {
            "name" : "Uber",
            "total_costs_by_cheapest_car_type" : 125,
            "currency_code": "USD",
            "total_duration" : 640,
            "duration_unit": "minute",
            "total_distance" : 25.05,
            "distance_unit": "mile"
        },
        {
            "name" : "Lyft",
            "total_costs_by_cheapest_car_type" : 110,
            "currency_code": "USD",
            "total_duration" : 620,
            "duration_unit": "minute",
            "total_distance" : 25.05,
            "distance_unit": "mile"
        }
    ]

  trip_id = trip.insert({'startlocation': startlocation, 'bestroute':best_route,
  'providers':providers, 'endlocation': endlocation})

  new_trip = trip.find_one({'_id': trip_id })

  output = {'id':str(trip_id), 'start' : new_trip['startlocation'], 'bestroute':new_trip['bestroute'],
  'providers':new_trip['providers'], 'end': new_trip['endlocation']}
  return json.dumps(output)
