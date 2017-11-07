class APIResponseError(Exception):
    '''Raised when the crypto API returns a status
    code that isn't 200'''
    pass
