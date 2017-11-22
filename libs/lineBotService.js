const { channelSecret } = require('../config/constant'),
    { channelAccessToken } = require('../config/constant');

const line = require('@line/bot-sdk');

let config = {
    channelAccessToken: channelAccessToken,
    channelSecret: channelSecret
};

const client = new line.Client(config);
const middleware = line.middleware(config);

module.exports = {
    line: line,
    middleware: middleware,
    client: client
}