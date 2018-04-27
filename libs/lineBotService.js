const { channelSecret } = require('../config/constant'),
    { channelAccessToken } = require('../config/constant');

const line = require('@line/bot-sdk'),
    axios = require('axios');

const config = {
    channelAccessToken: channelAccessToken,
    channelSecret: channelSecret
};

const client = new line.Client(config),
    middleware = line.middleware(config);

let getFollowerIDS = () => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: `https://api.line.me/v2/bot/followers/ids`,
            headers: {
                'Authorization': `Bearer ${channelAccessToken}`
            },
        }).then((response, err) => {
            if (err) {
                reject(err);
            } else
                resolve(response.data);
        }).catch((err) => {
            reject(err);
        });
    })
}

module.exports = {
    line: line,
    middleware: middleware,
    client: client,
    getFollowerIDS: getFollowerIDS
}