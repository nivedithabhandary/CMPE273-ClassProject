from flask import Flask, redirect, url_for, session, jsonify, request
from flask_pymongo import PyMongo
from flask import Blueprint
import simplejson as json
import requests

locationapi = Blueprint('locationapi', __name__)

g_mongo_handle = None
def set_mongo_handler(mongo_handle):
    global g_mongo_handle
    g_mongo_handle = mongo_handle

# Post location info
@locationapi.route('/locations', methods=['POST'])
def add_locations():
  global g_mongo_handle
  location = g_mongo_handle.db.locations

  email = request.json['email']
  name = request.json['name']
  address = request.json['address']
  city = request.json['city']
  state = request.json['state']
  zipcode = request.json['zipcode']

  # Get Lat Long from Google Map api
  latitude = 38.4220352
  longitude = -222.0841244
  coordinate = {
      "lat" : latitude,
      "lng" : longitude
   }


  location_id = location.insert({'email': email, 'name': name, 'address':address,
  'city':city, 'state': state, 'zipcode':zipcode, 'coordinate':coordinate})

  new_entry = location.find_one({'_id': location_id })

  output = {'id':str(new_entry['_id']), 'email': new_entry['email'],
  'name' : new_entry['name'],'address':new_entry['address'],
  'city':new_entry['city'],'state': new_entry['state'],
  'zipcode': new_entry['zipcode'],'coordinate':new_entry['coordinate'] }

  return json.dumps(output)

# Get all locations with email
@locationapi.route('/locations/<email>', methods=['GET'])
def get_all_locations(email):
  global g_mongo_handle
  location = g_mongo_handle.db.locations
  found = location.find_one({'email' : email})
  if found:
      output = []
      for s in location.find({'email' : email}):
          output.append({'id':str(s['_id']), 'email' : s['email'],
          'name' : s['name'],
          'address':s['address'],'city':s['city'],
          'state': s['state'], 'zipcode': s['zipcode'],
          'coordinate':s['coordinate']})
  else:
    output = "Error: No such saved email found!"
  return jsonify({'result' : output})

@locationapi.route('/locations/<email>', methods=['PUT'])
def modify_location(email):
  global g_mongo_handle
  location = g_mongo_handle.db.locations
  old_name = request.json['old_name']
  new_name = request.json['new_name']
  found = location.find_one({'$and':[{'email' : email}, {'name':old_name}]})
  if found:
      location.update({'$and':[{'email' : email}, {'name':old_name}]}, {"$set":{"name": new_name}})
      output = "Update Success"
  else:
      output = "Error: No such saved location name found!"
  return jsonify({'result' : output})

@locationapi.route('/locations/<email>', methods=['DELETE'])
def delete_location(email):
  global g_mongo_handle
  location = g_mongo_handle.db.locations
  found = location.find_one({'email' : email})
  if found:
      location.remove({'email':email})
      output = "Delete Success"
  else:
      output = "Error: No such saved location name found!"
  return jsonify({'result' : output})
