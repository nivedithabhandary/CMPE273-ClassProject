import googlemaps
import responses
import json
from googlemaps import convert

class OptimizedRoute:
    def directions(self, client, origin, destination,waypoints):
        params = {
            "origin": convert.latlng(origin),
            "destination": convert.latlng(destination)
        }
        print params
        waypoints = convert.location_list(waypoints)
        optimize_waypoints = True
        if optimize_waypoints:
            waypoints = "optimize:true|" + waypoints
        params["waypoints"] = waypoints
        return client._get("/maps/api/directions/json", params)["routes"][0]["waypoint_order"]

    def getWaypoints(self,origin, destination, waypoint):
        key = 'AIzaSyDLQyoxt-GHaSzqTu1pH8bPVedzTZYHqmg'
        client = googlemaps.Client(key)
        responses.add(responses.GET,
                        'https://maps.googleapis.com/maps/api/directions/json',
                        body='{"status":"OK","routes":[]}',
                        status=200,
                        content_type='application/json')
        routes = self.directions(client, origin, destination, waypoints=waypoint)
        placesList=[]
        placesList.append(origin)
        for place in routes:
            placesList.append(waypoint[place])
        placesList.append(destination)
        return placesList

