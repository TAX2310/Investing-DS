from flask import Flask

import calcStats as cs

app = Flask(__name__)

@app.route('/')
def index():
    return 'Hello,World!'

@app.route('/api/<ticker>')
def api(ticker):

    df = cs.get_df_from_yahoo(ticker)

    result = df.to_json(orient="table")

    return result
