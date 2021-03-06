function resize_canvas(){
    canvas = document.getElementById("chart");
    if (canvas.width  < window.innerWidth)
    {
        canvas.width  = window.innerWidth;
    }

}
function initGraph(input_data){
    var len = input_data['data'].length;
    var close_data = [];
    var moving_average = [];
    var candlestick_data = [];
    var upper_bollinger_bands = [];
    var lower_bollinger_bands = [];
    var tenkan_sen = [];
    var kijun_sen = [];
    var senkou_span_a = [];
    var senkou_span_b = [];
    var chikou_span = [];
        
    for(var i = 0; i<len; i++){
        var date = luxon.DateTime.fromISO( input_data['data'][i]['Date'])
        
        close_data.push({ 
            x: date.valueOf(),
            y: input_data['data'][i]['Close']
        });
        if(input_data['data'][i]['moving_average']){
            moving_average.push({ 
                x: date.valueOf(),
                y: input_data['data'][i]['moving_average']
            });
        };
        candlestick_data.push({
            x: date.valueOf(), 
            o: input_data['data'][i]['Open'],
            // o: Math.round((input_data['data'][i]['Open'] + Number.EPSILON) * 100) / 100,
            h: input_data['data'][i]['High'],
            l: input_data['data'][i]['Low'],
            c: input_data['data'][i]['Close']
        });
        if(input_data['data'][i]['upper_band']){
            upper_bollinger_bands.push({ 
                x: date.valueOf(),
                y: input_data['data'][i]['upper_band']
            });
        };
        if(input_data['data'][i]['lower_band']){
            lower_bollinger_bands.push({ 
                x: date.valueOf(),
                y: input_data['data'][i]['lower_band']
            });
        };
        if(input_data['data'][i]['tenkan_sen']){
            tenkan_sen.push({ 
                x: date.valueOf(),
                y: input_data['data'][i]['tenkan_sen']
            });
        };
        if(input_data['data'][i]['kijun_sen']){
            kijun_sen.push({ 
                x: date.valueOf(),
                y: input_data['data'][i]['kijun_sen']
            });
        };
        if(input_data['data'][i]['senkou_span_a']){
            senkou_span_a.push({ 
                x: date.valueOf(),
                y: input_data['data'][i]['senkou_span_a']
            });
        };
        if(input_data['data'][i]['senkou_span_b']){
            senkou_span_b.push({ 
                x: date.valueOf(),
                y: input_data['data'][i]['senkou_span_b']
            });
        };
        if(input_data['data'][i]['chikou_span']){
            chikou_span.push({ 
                x: date.valueOf(),
                y: input_data['data'][i]['chikou_span']
            });
        };
    };
    console.log(moving_average)
    console.log(chikou_span)

    const data = {
        datasets: [{
            label: 'Candlestick',
            data: candlestick_data
        },{
            label: 'Close',
            data: close_data,
            type: "line",
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
            pointRadius: 0
        },{
            label: 'Moving Average',
            data: moving_average,
            type: "line",
            fill: false,
            borderColor: 'rgb(197, 75, 192)',
            tension: 0.1,
            hidden: true,
            pointRadius: 0
        },{
            label: 'Upper Bollinger Bands',
            data: upper_bollinger_bands,
            type: "line",
            fill: false,
            borderColor: 'rgb(197, 192, 75)',
            tension: 0.1,
            hidden: true,
            pointRadius: 0
        },{
            label: 'Lower Bollinger Bands',
            data: lower_bollinger_bands,
            type: "line",
            fill: false,
            borderColor: 'rgb(197, 192, 75)',
            tension: 0.1,
            hidden: true,
            pointRadius: 0
        },{
            label: 'Tenkan-sen',
            data: tenkan_sen,
            type: "line",
            fill: false,
            borderColor: 'rgb(197, 10, 10)',
            tension: 0.1,
            hidden: true,
            pointRadius: 0
        },{
            label: 'Kijun-sen',
            data: kijun_sen,
            type: "line",
            fill: false,
            borderColor: 'rgb(10, 10, 197)',
            tension: 0.1,
            hidden: true,
            pointRadius: 0
        },{
            label: 'Senkou span A',
            data: senkou_span_a,
            type: "line",
            fill: {
                target: '+1',
                above: 'rgba(0, 255, 0)',
                below: 'rgba(255, 0, 0)'
            },
            borderColor: 'rgb(102, 153, 153)',
            tension: 0.1,
            hidden: true,
            borderDash: [3,5],
            pointRadius: 0
        },{
            label: 'Senkou span B',
            data: senkou_span_b,
            type: "line",
            fill: false,
            borderColor: 'rgb(102, 153, 153)',
            tension: 0.1,
            hidden: true,
            borderDash: [3,5],
            pointRadius: 0
        },{
            label: 'Chikou span',
            data: chikou_span,
            type: "line",
            fill: false,
            borderColor: 'rgb(102, 153, 153)',
            tension: 0.1,
            hidden: true,
            pointRadius: 0
        }]
    }; 

    const config = {
        type: 'candlestick',
        data,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: '<%= ticker %>'
                },
                zoom: {
                    zoom: {
                        wheel: {
                            enabled: true,
                        },
                        pinch: {
                            enabled: true
                        },
                        drag: {
                            enabled: true
                        },
                        mode: 'xy',
                        overScaleMode: 'y'
                    }
                },
            }
        }
    };

    const ctx = document.getElementById('chart').getContext('2d');

    const myChart = new Chart(ctx, config);
    // console.log(myChart)
}