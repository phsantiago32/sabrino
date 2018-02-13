// Description:
//   Cheerio test.

var request = require('request');
var cheerio = require('cheerio');

function scrape(robot) {
    robot.hear(/scrape/i, function (msg) {
        request('https://www.boadica.com.br/produtos/p132627', function (error, response, html) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html);
                var responseMsg = '';
                $('.preco-loja').each(function (i, element) {
                    var a = '• ' + $(this).text().replace('BOX', '').trim() + '\n';
                    responseMsg = responseMsg + a;
                });
                msg.send(responseMsg);
            }
        });
    })
}
module.exports = scrape;