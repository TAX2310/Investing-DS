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

def get_df_from_yahoo(ticker, period):
    stock = yf.Ticker(ticker)
    df = stock.history(period)
    return df

def add_daily_return_to_df(df):
    df['daily_return'] = (df['Close'] - df['Close'].shift(1)) / df['Close'].shift(1)
    return df

def add_cum_return_to_df(df):
    df['cum_return'] = (1 + df['daily_return']).cumprod()
    return df

def add_moving_average(df, day):
    df['moving_average'] = df['Close'].rolling(window=day).mean()
    return df

def add_std_deviation(df, day):
    df['std_deviation'] = df['Close'].rolling(window=day).std()
    return df

def add_bollinger_bands(df):
    df['upper_band'] = df['moving_average'] + 1.96 * df['std_deviation']
    df['lower_band'] = df['moving_average'] - 1.96 * df['std_deviation']
    return df

def add_ichimoku(df):
    hi_val_1 = df['High'].rolling(window=9).max()
    low_val_1 = df['Low'].rolling(window=9).min()
    df['tenkan-sen'] = hi_val_1 + low_val_1 / 2 

    hi_val_2 = df['High'].rolling(window=26).max()
    low_val_2 = df['Low'].rolling(window=26).min()
    df['kijun-sen'] = hi_val_2 + low_val_2 / 2 

    df['senkou_span_a'] = ((df['tenkan-sen'] + df['kijun-sen']) / 2 ).shift(26)

    hi_val_3 = df['High'].rolling(window=52).max()
    low_val_3 = df['Low'].rolling(window=52).min()
    df['senkou_span_b'] = ((df['tenkan-sen'] + df['kijun-sen']) / 2 ).rolling(window=52).mean()

    df['Chikou_span'] = df['Close'].shift(-26)

    return df