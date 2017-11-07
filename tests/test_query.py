import pytest
import json

if __package__ is None:
    from utils import find_graze
    import_library('../../')


if __name__ == '__main__':
    pytest.main([__file__])
