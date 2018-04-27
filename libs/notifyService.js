const defaultApiUrl = `https://notify-api.line.me`,
    { DOMAIN_URL } = require('../config/constant'),
    { notifyId } = require('../config/constant'),
    { notifySecret } = require('../config/constant');

const axios = require('axios'),
    queryString = require('querystring');

let notify = (accessToken, textMessage) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: `https://notify-api.line.me/api/notify`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            data: queryString.stringify({
                message: `${textMessage}`
            })
        }).then((response, err) => {
            if (err) {
                reject(err);
                console.log(err);
            } else
                resolve(response.data);
        }).catch((err) => {
            reject(err);
        });
    })
}

let auoth = (code, redirect_uri) => {
    console.info(redirect_uri);
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: `https://notify-bot.line.me/oauth/token`,
            data: queryString.stringify({
                'grant_type': 'authorization_code',
                'code': `${code}`,
                'redirect_uri': `${redirect_uri}`,
                'client_id': `${notifyId}`,
                'client_secret': `${notifySecret}`
            })
        }).then((response, err) => {
            if (err) {
                reject(err);
                console.log(err);
            } else
                resolve(response.data);
        }).catch((err) => {
            reject(err);
        });
    })
}

module.exports = {
    notify: notify,
    auoth: auoth
}