from flask import Flask

import calcStats as cs

app = Flask(__name__)

@app.route('/')
def index():
    return 'Hello,World!'

@app.route('/api/<ticker>/<period>/<moving>')
def api(ticker, period, moving):

    df = cs.get_df_from_yahoo(ticker, period)

    df = cs.add_daily_return_to_df(df)

    df = cs.add_cum_return_to_df(df)

    moving = int(moving)
    df = cs.add_moving_average(df, moving)

    df = cs.add_std_deviation(df, moving)

    df = cs.add_bollinger_bands(df)

    df = cs.add_ichimoku(df)

    result = df.to_json(orient="table")

    print(result)

    return result