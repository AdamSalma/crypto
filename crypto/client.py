import json
import logging
import requests

from .exceptions import APIResponseError

log = logging.getLogger(__name__)

class EndpointBuilder(dict):
    '''Holds http endpoints for the API. Used by the CryptoClient to
    build endpoints with queries'''
    base_url = "https://min-api.cryptocompare.com/data/"
    price = "pricemulti"
    HISTODAY = "histoday"


    def __init__(self, endpoint):
        self.endpoint = endpoint

    def create_url(self, query):
        '''Make absolute url'''
        return self.base_url + getattr(self, self.endpoint) + query


class QueryBuilder(object):
    '''Creates a query string by mapping the kwargs supplied to __init__
    with the internal aliases that are used by the external crypto API.'''
    aliases = {
        "coin": "fsym",
        "coins": "fsyms",
        "currency": "tsym",
        "currencies": "tsyms"
    }

    def __init__(self, **kwargs):
        self.kwargs = kwargs

    def create_query(self):
        query = []

        for key, value in self.kwargs.items():
            for alias, actual in self.aliases.items():
                if key == alias:
                    query.append("{}={}".format(actual, value))

        return "?" + "&".join(query)


class CryptoClient(object):
    """A data fetcher that communicates to a 3rd party public
       api to access crypto currency market information"""

    def __init__(self, config={}):
        self.config = config
        # TODO: self.get_request_quota
        #   https://min-api.cryptocompare.com/stats/rate/hour/limit

    def fetch_history(self, coin=None, currency=None):
        return self._perform_fetch("HISTODAY", coin=coin, currency=currency)

    def fetch_history(self, coin=None, currency=None):
        return self._perform_fetch("HISTODAY", coin=coin, currency=currency)

    def _perform_fetch(self, endpoint, **kwargs):
        query = QueryBuilder(**kwargs).create_query()
        url = EndpointBuilder(endpoint).create_url(query)

        res = requests.get(url)

        log.info("Data fetched: {}".format(json.dumps(res.json(), indent=4)))

        self._handle_response(res)

        return CryptoData(res.json())

    def _handle_response(self, res):
        content = res.json()

        if res.status_code != 200:
            raise APIResponseError("Received status code {} from api".format(res.status_code))

        if content.get("Response") == "Error":
            raise APIResponseError(content.get("Message"))


class CryptoData(object):
    '''Allows data to be consumed using dot syntax by recursively
       setting attributes on itself when initialised.

        >> CryptoData({ "hello": "world" }).hello
        >> "world"
    '''
    def __init__(self, data):
        self._bind_data(data)
        self._attrs = []

    def _bind_data(self, data):
        for key, value in data.items():
            if isinstance(value, dict):
                value = CryptoData(value)

            setattr(self, key, value)

    def __setattr__(self, key, value):
        self._attrs.append(key)
        setattr(self, key, value)

    def __dir__(self):
        return self._attrs

CryptoData({"hello": "world"})
