import sys
import logging
from os import path



# # Load libraries
# import pandas
# from pandas.tools.plotting import scatter_matrix
# import matplotlib.pyplot as plt
# from sklearn import model_selection
# from sklearn.metrics import classification_report
# from sklearn.metrics import confusion_matrix
# from sklearn.metrics import accuracy_score
# from sklearn.linear_model import LogisticRegression
# from sklearn.tree import DecisionTreeClassifier
# from sklearn.neighbors import KNeighborsClassifier
# from sklearn.discriminant_analysis import LinearDiscriminantAnalysis
# from sklearn.naive_bayes import GaussianNB
# from sklearn.svm import SVC



logging.basicConfig(
    level=0,
    format='\n%(asctime)s | %(module)s.py, line %(lineno)d\n[%(levelname)s] - %(message)s',
    datefmt="%H:%M:%S",
    disable_existing_loggers=False
)
log = logging.getLogger(__name__)

# Allow importing the library by traversing up
sys.path.append(
    path.dirname(path.dirname(
        path.abspath(__file__))))

from crypto import CryptoClient

def main():
    client = CryptoClient()
    report = client.fetch_history("BTC", "USD")
    # for x in dir(report):
    #     print x

    # log.info(report.BTC)
    # log.info("Starting here:")
    # for x in dir(report):
    #     log.info(x)

    # log.info("Testing:")
    # log.info("ETH: {}".format(report.ETH))
    # log.info("USD: {}".format(report.ETH.USD))
    # # print report.content



if __name__ == '__main__':

    main()
