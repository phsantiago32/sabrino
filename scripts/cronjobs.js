// Description:
//   Scheduled Commands.

const HubotCron = require('hubot-cronjob');
const request = require('request');

function cron(robot) {

    var breakTime = function () {

        var token = process.env.TELEGRAM_TOKEN;

        var requestOptions = {
            uri: 'https://api.telegram.org/bot'+token+'/sendMessage',
            method: 'POST',
            json: {
                "chat_id": "65171887",
                "text": "Partiu lanchar?"
            }
        };

        request(requestOptions, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log('Convite de lanche enviado!');
            } else {
                console.log('Sem lanche hoje :(');
            }
        });
    }

    var cronPattern = '0 25 18 * * MON,TUE,WED,THU,FRI';
    var timezone = 'America/Sao_Paulo';

    new HubotCron(cronPattern, timezone, breakTime);

}

module.exports = cron;