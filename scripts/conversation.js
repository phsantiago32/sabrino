// // Description:
// //   Conversation test.

// const Conversation = require('hubot-conversation');
// function conversation(robot) {

//     robot.respond(/clean the house/, function (msg) {

//         var switchBoard = new Conversation(robot);
//         var dialog = switchBoard.startDialog(msg);

//         msg.reply('Sure, where should I start? Kitchen or Bathroom');
//         dialog.addChoice(/kitchen/i, function (msg2) {
//             msg2.reply('On it boss!');
//         });
//         dialog.addChoice(/bathroom/i, function (msg2) {
//             msg.reply('Do I really have to?');
//             dialog.addChoice(/yes/, function (msg3) {
//                 msg3.reply('Fine, Mom!');
//             })
//         });
//     });

//     robot.respond(/jump/, function (msg) {
//         var switchBoard = new Conversation(robot);
//         var dialog = switchBoard.startDialog(msg);
//         msg.reply('Sure, How many times?');

//         dialog.addChoice(/([0-9]+)/i, function (msg2) {
//             var times = parseInt(msg2.match[1], 10);
//             for (var i = 0; i < times; i++) {
//                 msg.emote("Jumps"); //We can use the original message too.
//             }
//         });
//     });


//     robot.respond(/.*the mission/, function (msg) {
//         msg.reply('You have 5 seconds to accept your mission, or this message will self-destruct');
//         var dialog = switchBoard.startDialog(msg, 5000); //5 Second timeout
//         dialog.dialogTimeout = function (msg2) {
//             msg2.emote('Boom');
//         }
//         dialog.addChoice(/yes/i, function (msg2) {
//             msg2.reply('Great! Here are the details...');
//         });
//     });
// };
// module.exports = conversation;