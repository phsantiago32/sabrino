// Description:
//   Scheduled Commands.

const HubotCron = require('hubot-cronjob');
const request = require('request');
const Tgfancy = require("tgfancy");

function cron(robot) {
    const userJuliana = '';
    const userCabral = '@tiagocabralb';
    const token = process.env.TELEGRAM_TOKEN;

    const bot = new Tgfancy(token, {
        tgfancy: {
            chatIdResolution: true
        },
    });

    var breakTime = function () {

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

    var cronPattern = '0 0 17 * * MON,TUE,WED,THU,FRI';
    var timezone = 'America/Sao_Paulo';

    new HubotCron(cronPattern, timezone, breakTime);

    robot.hear(/find me/i, function (msg) {
        console.log('waiting...');
        bot.sendMessage("@phsantiago", "Message sent using username");
    });

    robot.hear(/cabral viado/i, function (msg) {
        msg.send('zoando o cabral');
        bot.sendMessage(userCabral, "viado");
    });

}

module.exports = cron;