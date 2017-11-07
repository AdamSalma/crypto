import matplotlib.pyplot as plt
import numpy as np
import pandas as pd


class CryptoGraph(object):

    def __init__(self, coins, to_currency):
        self.coins = coins
        self.to_currency = to_currency

        self.client = CryptoClient()

    def days_ago(self, from_days_ago, to_days_ago=None):
        pass

    def change_over_days(self):
        pass

# CryptoGraph().days_ago(30)



# frame = pd.DataFrame({
#     'x': range(1,11),
#     'y': np.random.randn(10)
# })
