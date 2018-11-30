// Description:
//   Scheduled Commands.

const HubotCron = require('hubot-cronjob');
const request = require('request');
const Tgfancy = require("tgfancy");
const datejs = require('datejs');
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

    var btcAlertProbe = function () {
        var requestOptions = {
            uri: 'https://api.bitcointrade.com.br/v1/market/estimated_price?amount=1&currency=BTC&type=buy',
            method: 'GET',
            headers: {
                'Authorization': 'ApiToken ' + btcToken
            }
        };

        var lastAlertDate;
        request(requestOptions, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var r = JSON.parse(body);

                var price = parseFloat(Math.round(r.data.price * 100) / 100).toFixed(2);

                var dateNow = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

                if (price <= 25000) {
                    lastAlertDate = dateNow;
                    bot.sendMessage("65171887", "ALERTA DE BAIXA! Preço de venda do BTC abaixo de 32k: R$" + price + " (" + dateNow + ")");
                }
                else if (price >= 32000) {
                    lastAlertDate = dateNow;
                    bot.sendMessage("65171887", "ALERTA DE ALTA! Preço de venda do BTC acima de 39k: R$" + price + " (" + dateNow + ")");
                }
            }
            else {
                bot.sendMessage("65171887", "Erro ao sondar BTC (alerta)");
                bot.sendMessage("65171887", "Error: \n" + error);
            }
        });

        function shouldAlert(startDate, endDate) {
            if (!startDate) {
                return true;
            }
            var diff = new TimeSpan(endDate - startDate);
            return diff.minutes > 10;
        }
    }

    new HubotCron('*/5 * * * *', timezone, btcAlertProbe);


    var btcProbe = function () {
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

                var dateNow = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

                bot.sendMessage("65171887", "Cotação BTC: R$" + price + " (" + dateNow + ")");
            }
            else {
                bot.sendMessage("65171887", "Erro ao sondar BTC");
            }
        });
    }

    new HubotCron('*/45 * * * *', timezone, btcProbe);
}

module.exports = cron;