# coding=utf-8
import googlemaps
import json
from geopy.geocoders import Nominatim
from UberDetails import UberData
from OptimizeRoute import OptimizedRoute
from collections import OrderedDict

class PriceDetails:

    def getOptimizedRoute(self, origin, destination, waypoints):
        places = []
        optRoute = OptimizedRoute()
        places = optRoute.getWaypoints(origin,destination,waypoints)
        return places
    
    def convertLoctoLatLong(self, places):
        locationLatLng = {}
        geolocator = Nominatim()
        for place in places:
            location = geolocator.geocode(place)
            locationLatLng[place] = location.latitude, location.longitude
        return locationLatLng

    def getUberData(self, places, locationLatLng):
        uberKey = "LcSRQ6aV3oftJUWTvV0830t_Lf42MSSmNL5BI3K8"
        uberData = UberData()
        uberFinalAmount = 0
        for place in range(len(places)-1):
            startLat = locationLatLng.get(places[place])[0]
            startLong = locationLatLng.get(places[place])[1]
            endLat = locationLatLng.get(places[place+1])[0]
            endLong = locationLatLng.get(places[place+1])[1]
            prices = uberData.fetchUberPrices(startLat,startLong,endLat,endLong,uberKey)
            price = prices[0].split('$',1)
            uberFinalAmount = uberFinalAmount+int((price[1].split('-',1))[0])
        return uberFinalAmount

    def getLyftData(self, places, locationLatLng):
        lyftFinalAmount = 0
        return lyftFinalAmount

    def getPriceDetails(self, origin, destination, waypoints):
        priceMap = OrderedDict()
        priceList = []
        places = self.getOptimizedRoute(origin, destination, waypoints)
        priceMap["places"] = places
        locationLatLng = self.convertLoctoLatLong(places)
        uberFinalAmount = self.getUberData(places, locationLatLng)
        priceMap["uberPrice"] = uberFinalAmount
        lyftFinalAmount = self.getLyftData(places, locationLatLng)
        priceMap["lyftPrice"] = lyftFinalAmount
        priceList.append(priceMap)
        return json.dumps(priceList)

    