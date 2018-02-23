// Description:
//   Scheduled Commands.

const HubotCron = require('hubot-cronjob');
const request = require('request');
const Tgfancy = require("tgfancy");
const telegramToken = process.env.TELEGRAM_TOKEN;
const btcToken = process.env.BTC_TRADE_TOKEN;
const bot = new Tgfancy(telegramToken, {
    tgfancy: {
        chatIdResolution: true
    },
});

function cron(robot) {

    var breakTime = function () {
        bot.sendMessage("@phsantiago", "Partiu lanchar?");
    }

    var cronPattern = '0 0 17 * * MON,TUE,WED,THU,FRI';
    var timezone = 'America/Sao_Paulo';

    new HubotCron(cronPattern, timezone, breakTime);

    var btcMonitor = function () {
        var requestOptions = {
            uri: 'https://api.bitcointrade.com.br/v1/market/estimated_price?amount=1&currency=BTC&type=buy',
            method: 'GET',
            headers: {
                'Authorization': 'ApiToken ' + btcToken
            }
        };

        request(requestOptions, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var r = JSON.parse(body);

                var price = parseFloat(Math.round(r.data.price * 100) / 100).toFixed(2);

                var dateTime = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
                
                if (price <= 32000) {
                    bot.sendMessage("65171887", "ALERTA DE BAIXA! Preço de venda do BTC abaixo de 32k: R$" + price + "(" + dateTime + ")");
                }
                else if (price >= 39000) {
                    bot.sendMessage("65171887", "ALERTA DE ALTA! Preço de venda do BTC acima de 39k:" + price + "(" + dateTime + ")");
                }
            } else {
                bot.sendMessage("65171887", "Erro ao sondar BTC");
            }
        });
    }

    new HubotCron('*/5 * * * *', timezone, btcMonitor);
}

module.exports = cron;