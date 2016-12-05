import googlemaps
import responses
import json
from googlemaps import convert

class GeoCodes:
    def geocode(self, client, address):
        params = {}
        params["address"] = address
        return client._get("/maps/api/geocode/json", params)["results"]

    def getGeoCodes(self, address):
        key = 'AIzaSyDgSZfdk2Ui8tV_zuFeklu7eS3987uNbtU'
        client = googlemaps.Client(key)
        latlng = []
        responses.add(responses.GET,
                      'https://maps.googleapis.com/maps/api/geocode/json',
                      body='{"status":"OK","results":[]}',
                      status=200,
                      content_type='application/json')
        results = self.geocode(client, address)
        geometry = results[0]["geometry"]
        latlng.append(geometry["location"]["lat"])
        latlng.append(geometry["location"]["lng"])
        return latlng