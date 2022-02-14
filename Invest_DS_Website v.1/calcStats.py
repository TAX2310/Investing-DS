import numpy as np 

import pandas as pd 
import matplotlib.pyplot as plt
import matplotlib.dates as mdates

import datetime as dt 

import time

import yfinance as yf

import os

import cufflinks as cf
import plotly.express as px
import plotly.graph_objects as go

# from plotly.offline import download_plotlyjs, init_notebook_mode, plot, iplot
# init_notebook_mode(connected=True)

cf.go_offline()

from plotly.subplots import make_subplots

import json
import sys

import os
from os import listdir
from os.path import isfile, join

import warnings
warnings.simplefilter("ignore")


def get_df_from_yahoo(ticker):
    stock = yf.Ticker(ticker)
    df = stock.history(period="5y")
    return df

df = get_df_from_yahoo(sys.argv[1])

print(df)

sys.stdout.flush()