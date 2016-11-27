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

@locationapi.route('/locations', methods=['POST'])
def add_locations():
  global g_mongo_handle
  location = g_mongo_handle.db.locations

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


  location_id = location.insert({'name': name, 'address':address,
  'city':city, 'state': state, 'zipcode':zipcode, 'coordinate':coordinate})

  new_entry = location.find_one({'_id': location_id })

  output = {'id':str(new_entry['_id']), 'name' : new_entry['name'],
  'address':new_entry['address'],'city':new_entry['city'],
  'state': new_entry['state'], 'zipcode': new_entry['zipcode'],
  'coordinate':new_entry['coordinate'] }

  return json.dumps(output)

@locationapi.route('/locations/<name>', methods=['GET'])
def get_location(name):
  global g_mongo_handle
  location = g_mongo_handle.db.locations
  found = location.find_one({'name' : name})
  if found:
    output = {'id':str(found['_id']), 'name' : found['name'],
    'address':found['address'],'city':found['city'],
    'state': found['state'], 'zipcode': found['zipcode'],
    'coordinate':found['coordinate']}
  else:
    output = "Error: No such saved location name found!"
  return jsonify({'result' : output})

@locationapi.route('/locations/<name>', methods=['PUT'])
def modify_location(name):
  global g_mongo_handle
  location = g_mongo_handle.db.locations
  found = location.find_one({'name' : name})
  new_name = request.json['name']
  if found:
      location.update({'name':name}, {"$set":{"name": new_name}})
      output = "Update Success"
  else:
      output = "Error: No such saved location name found!"
  return jsonify({'result' : output})

@locationapi.route('/locations/<name>', methods=['DELETE'])
def delete_location(name):
  global g_mongo_handle
  location = g_mongo_handle.db.locations
  found = location.find_one({'name' : name})
  if found:
      location.remove({'name':name})
      output = "Delete Success"
  else:
      output = "Error: No such saved location name found!"
  return jsonify({'result' : output})
