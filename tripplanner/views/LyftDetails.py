from geopy.geocoders import Nominatim
import requests, json, rauth
from requests.auth import HTTPBasicAuth

class LyftObj:
    """
    For Lyft object generation
    """
    def __init__(self):
        """
        initialize connection to the api url and get access token
        """
        self.client_id = '1IUtBMFNpu-a'
        self.client_secret = '8aKUuBCyPmBjlejnnpcJzm9_kJX8HZRi'

        # obtain access token
        self.token = self.__generate_token__()

        # define variables to be used in the request parameters
        token_val = 'Bearer '+self.token
        self.headers = {'Authorization':token_val}

    def __generate_token__(self):
        """
        use client_id and client_secret to generate access token.
        """
        url = 'https://api.lyft.com/oauth/token'

        # define request parameters
        payload = {"Content-Type": "application/json",
        "grant_type": "client_credentials",
        "scope": "public"}

        auth_header = HTTPBasicAuth(self.client_id, self.client_secret)

        # request data
        res = requests.post(url=url,
        data = payload,
        auth = auth_header)

        # extract the token from the response
        token = res.json()['access_token']
        return token

    def get_lyft_ride_cost(self,startLatitude,startLongitude,endLatitude,endLongitude):
        """
         using the lyft cost api to get the prices for a route
        """
        url = 'https://api.lyft.com/v1/cost?start_lat='+str(startLatitude)+'&start_lng='+str(startLongitude)+'&end_lat='+str(endLatitude)+'&end_lng='+str(endLongitude)
        ride_cost = requests.get(url,headers=self.headers).json()['cost_estimates']
        lyftPrices = []
        for data in ride_cost:
            if data["ride_type"] == "lyft":
                lyftPrices.append(data["ride_type"]+" "+str(data["estimated_cost_cents_min"]/100))
        return lyftPrices
