// Description:
//   Commands for gathering BTC info.

const ba = require('bitcoinaverage');

function BTC(robot) {
    robot.hear(/btc to USD/i, function (msg) {
        // var currency = msg.match[1]
        // if (currency == 'BRL') {
        //     robot.http("https://api.bitcointrade.com.br/v1/market/estimated_price?amount=1&currency=BTC&type=buy")
        //         .header('Authorization', 'ApiToken U2FsdGVkX1+Xt8N9NmAVW7Kn2v0rQ5fVPYf8z4Y/yzg=')
        //         .get(function (err, response, body) {
        //             if (err) {
        //                 msg.send("Erro! " + err)
        //             }
        //             msg.send("response: " + body)
        //         })
        // }
        // else {
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
        // }
    });
}

module.exports = BTC;