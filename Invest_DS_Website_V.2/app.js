const express = require('express');
const app = express();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile('C:/Users/Taylor/Documents/Documents/Invest_DS/Invest_DS_Website_V.2/index.html')
});

app.post('/collect_data', (req, res, next) => {
    let ticker = req.body.ticker;
    api_url = 'http://127.0.0.1:5000/api/' + ticker
    console.log(api_url)

    fetch(api_url).then(res => res.json()).then(function(data) {
        returned = data;
        console.log(returned);
    });
});

app.listen(3000,() => console.log('listening on port 3000'));