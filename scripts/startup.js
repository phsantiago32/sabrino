// Description:
//   Env setup commands.

var dotenv = require('dotenv');

function init() {
    dotenv.config()
    console.log('env loaded');
}

module.exports = init;