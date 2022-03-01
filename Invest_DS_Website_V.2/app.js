const express = require('express');
var cors = require('cors')
const app = express();

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.set('views',__dirname + '/views');
app.use('/scripts', express.static(__dirname + '/node_modules'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// get.save_tickers()

app.get('/', (req, res) => {
    res.render('index.ejs')
});

app.post('/collect_data', (req, res, next) => {
    let ticker = req.body.ticker;
    let period = req.body.period;
    let moving = req.body.moving;
    console.log(typeof moving)
    api_url = 'http://127.0.0.1:5000/api/' + ticker + '/' + period + '/' + moving;
    console.log(api_url)

    fetch(api_url).then(res => res.json()).then(function(data) {
        returned = data;
        // console.log(returned);

        res.render('graph.ejs', {returned, ticker}) 
        // console.log(res); 
    });  

}); 

app.get('/searchbar', (req, res) => {

    async function search(input){
            
        api_url = "https://finance.yahoo.com/_finance_doubledown/api/resource/searchassist;searchTerm=" + input + "?device=console&returnMeta=true"
        await fetch(api_url, {mode: 'no-cors'}).then(res => res.json()).then(function(data) {
            console.log(data);
            res.json(data);
        });
    }
    search(req.query.search )
    
});
 
app.listen(3000,() => console.log('listening on port 3000'));  