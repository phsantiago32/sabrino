// Description:
//   Commands for gathering BTC info.

const ba = require('bitcoinaverage');

function BTC(robot) {
    robot.hear(/btc/i, function (msg) {
        var key1 = 'YzFiMWU1ODViMDJkNDg4NmFhNjVlNDc4Mzg1ZjMxYTM';
        var key2 = 'MzM4MmFjN2EwM2Y3NDIwNDg4NTEyOGZhYzZmODE1ODM1YTViNTM3NDk2ODI0ZmE0OGYyZTYzYjM2MjU0ZjgzMg';

        var restClient = ba.restfulClient(key1, key2);

        // Convert from BTC to USD
        var from = 'BTC', to = 'USD', amount = 1;

        restClient.performConversionLocal(from, to, amount, function (response) {
            response = JSON.parse(response);
            var apiResponse = "At time " + response.time + " the cost of " + amount + " " + from + " is " + response.price + " " + to;
            msg.send(apiResponse);
        });
    });
}

module.exports = BTC;