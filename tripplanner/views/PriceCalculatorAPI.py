# coding=utf-8
from PriceCalculator import PriceDetails
from flask import Blueprint
from flask import Flask, request
import simplejson as json

priceCalculatorAPI = Blueprint('priceCalculatorAPI', __name__)

@priceCalculatorAPI.route('/fetchPrices', methods=['POST'])
def fetchPriceDetails():
    
    request_data = request.get_json(force=True)
    origin = request_data[0]["origin"]
    destination = request_data[0]["destination"]
    waypoints = request_data[0]["waypoints"]
    priceDetails = PriceDetails()
    return priceDetails.getPriceDetails(origin, destination, waypoints)