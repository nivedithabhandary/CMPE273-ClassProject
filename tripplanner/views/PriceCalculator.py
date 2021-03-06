# coding=utf-8
import googlemaps
import json
from geopy.geocoders import Nominatim
from UberDetails import UberData
from LyftDetails import LyftObj
from OptimizeRoute import OptimizedRoute
from collections import OrderedDict
from geoCoding import GeoCodes

class PriceDetails:

    def getOptimizedRoute(self, origin, destination, waypoints):
        places = []
        optRoute = OptimizedRoute()
        print "Inside Price Details"
        print origin
        print destination
        print waypoints
        places = optRoute.getWaypoints(origin,destination,waypoints)
        return places

    def convertLoctoLatLong(self, places):
        location = GeoCodes()
        latlngList = OrderedDict()
        for place in places:
            latlng = []
            latlng = location.getGeoCodes(place)
            latlngList[place] = latlng
        return latlngList
    
    def convertLoctoLatLongList(self, places):
        location = GeoCodes()
        latlngList = []
        for place in places:
            latlng = []
            latlng = location.getGeoCodes(place)
            latlngList.append(latlng)
        return latlngList

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
            print (prices)
            price = prices[0].split('$',1)
            uberFinalAmount = uberFinalAmount+int((price[1].split('-',1))[0])
        return uberFinalAmount

    """
        Method to get the combined Lyft prices for optmized route
    """
    def getLyftData(self, places, locationLatLng):
        lyftFinalAmount = 0
        lyftData = LyftObj()
        for place in range(len(places)-1):
            startLat = locationLatLng.get(places[place])[0]
            startLong = locationLatLng.get(places[place])[1]
            endLat = locationLatLng.get(places[place+1])[0]
            endLong = locationLatLng.get(places[place+1])[1]
            prices = lyftData.get_lyft_ride_cost(startLat,startLong,endLat,endLong)
            price = prices[0].split(' ')
            lyftFinalAmount = lyftFinalAmount+int(price[1])
        return lyftFinalAmount

    def getPriceDetails(self, origin, destination, waypoints):
        priceMap = OrderedDict()
        priceList = []
        places = self.getOptimizedRoute(origin, destination, waypoints)
        priceMap["places"] = places
        locationLatLng = self.convertLoctoLatLong(places)
        priceMap["locationLatLng"] = locationLatLng
        locationLatLngList = self.convertLoctoLatLongList(places)
        priceMap["locationLatLngList"] = locationLatLngList
        uberFinalAmount = self.getUberData(places, locationLatLng)
        priceMap["uberPrice"] = uberFinalAmount
        lyftFinalAmount = self.getLyftData(places, locationLatLng)
        priceMap["lyftPrice"] = lyftFinalAmount
        priceList.append(priceMap)
        print priceList
        return json.dumps(priceList)