from urllib2 import urlopen
import urllib2,cookielib
import json

class UberData:
    def fetchUberPrices(self,startLatitude, startLongitude, endLatitude, endLongitude, uberKey):
        site= "https://api.uber.com/v1/estimates/price?start_latitude="+str(startLatitude)+"&start_longitude="+str(startLongitude)+"&end_latitude="+str(endLatitude)+"&end_longitude="+str(endLongitude)+"&server_token="+uberKey
        print site
        req = urllib2.Request(site)
        try:
            page = urllib2.urlopen(req)
        except urllib2.HTTPError, e:
            print e.fp.read()
        content = page.read()
        wjdata = json.loads(content)
        uberPrices = []
        for data in wjdata["prices"]:
            if data["localized_display_name"] == "uberX":
                uberPrices.append(data["localized_display_name"]+" "+data["estimate"])
        return uberPrices