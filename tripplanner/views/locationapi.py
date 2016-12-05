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
  locationList = request.json['locations']
  userData = []
  for index in range(len(locationList)-1):
      data = []
      if index%2==0:
        name = locationList[index]
        address = locationList[index+1]
        data.append(name)
        data.append(address)
        userData.append(data)

  location_id = location.insert({'email': email, 'locations': userData})
  new_entry = location.find_one({'_id': location_id })
  output = {'id':str(new_entry['_id']), 'email': new_entry['email'],'locations' : new_entry['locations']}
  return json.dumps(output)

# Get all locations with email
@locationapi.route('/locations/<email>', methods=['GET'])
def get_all_locations(email):
  global g_mongo_handle
  location = g_mongo_handle.db.locations
  found = None
  found = location.find({'email' : email})
  if found:
      output = []

      for s in location.find({'email' : email}):
          print s
          output.append({'id':str(s['_id']), 'email' : s['email'],
          'locations':s['locations']})

  else:
    output = "Error: No such saved email found!"
  return json.dumps(output)

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
  name = request.json['name']
  found = location.find_one({'$and':[{'email' : email}, {'name':name}]})
  if found:
      location.remove({'name':name})
      output = "Delete Success"
  else:
      output = "Error: No such saved location name found!"
  return jsonify({'result' : output})
