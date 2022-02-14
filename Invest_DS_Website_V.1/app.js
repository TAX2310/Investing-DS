const express = require('express');
const app = express();
const spawn = require("child_process").spawn;

app.get('/', (req, res) => {
    res.sendFile('C:/Users/Taylor/Documents/Documents/Invest_DS/Invest_DS_Website/index.html')
});

app.get('/api/:ticker', (req, res) => {
    ticker = req.params.ticker
    stats = spawn('python',["calcStats.py", ticker]);
    stats.stdout.on('data', (data) => {
        stats_send = data;
        res.send(stats_Send)
    });
});    

app.listen(3000,() => console.log('listening on port 3000'))  