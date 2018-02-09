// Description:
//   Commands for gathering BTC info.

const ba = require('bitcoinaverage');

function BTC(robot) {
    robot.hear(/btc/i, function (msg) {
        var pk = process.env.BTC_AVERAGE_PK || '';
        var sk = process.env.BTC_AVERAGE_SK || ''

        var restClient = ba.restfulClient(pk, sk);

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