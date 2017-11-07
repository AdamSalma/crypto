import os
import json
import logging

log = logging.getLogger(__name__)


class Config(object):
    """
    This class will read an existing dict, string or valid JSON
    fileobj and will create a generic object where input fields are
    attributes of the object.

    Methods:
        _parse: parses json data.
        _from_file: when imput data comes from a fileobject
    """

    def __init__(self, data=None, fileobj=None):
        if not fileobj and not data:
            raise ValueError("Either data or fileobj is required.")

        if fileobj:                  # Instantiated with file
            self.raw = self._from_file(fileobj)
        elif isinstance(data, str):  # Instantiated with string or json
            self.raw = json.loads(data)
        else:                        # Instantiated with dict
            self.raw = data

        self._setattrs(self.raw)

    def _setattrs(self, data):
        for k, v in data.items():
            setattr(self, k, v)

    def _from_file(self, fileobj):
        return json.loads(fileobj.read())
