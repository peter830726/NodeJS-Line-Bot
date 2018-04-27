const { lineLoginChannelId } = require('../config/constant'),
    { lineLoginSecret } = require('../config/constant');

const axios = require('axios'),
    queryString = require('querystring'),
    jwt = require('jsonwebtoken');

/* 
response:
access_token:有效期限30天
expires_in:訪問令牌到期的時間（以秒為單位）。
id_token:一個jwt,只有scope中有指定openid 才會回傳此值
refresh_token:令牌用於獲取新的訪問令牌。有效期至訪問令牌到期後10天。
scope:用戶授予的權限。
token_type:Bearer
*/
let auoth = (version, code, redirect_uri) => {
    console.info(redirect_uri);
    var postUrl = null;
    if (version === 'v2') {
        postUrl = `https://api.line.me/v2/oauth/accessToken`;
    } else if (version === 'v2.1') {
        postUrl = `https://api.line.me/oauth2/v2.1/token`;
    }
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: postUrl,
            data: queryString.stringify({
                'grant_type': 'authorization_code',//authorization_code
                'code': `${code}`,//Authorization code                
                'redirect_uri': `${redirect_uri}`,
                'client_id': `${lineLoginChannelId}`,
                'client_secret': `${lineLoginSecret}`
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

let verifyAccessToken = (accessToken) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: `https://api.line.me/oauth2/v2.1/verify?access_token=${accessToken}`
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

/*取得使用者資訊*/
/*
userId
displayName
picture
statusMessage
*/
let getProfile = (accessToken) => {
    console.info('accessToken', accessToken);
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: `https://api.line.me/v2/profile`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
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


let jwtVerify = (token) => {
    let issuer = `https://access.line.me`;
    let algorithms = ['HS256'];
    let maxAge = '1D';
    return new Promise((resolve, reject) => {
        /*
        驗證 token 正確性
        secret 
        audience
        algorithm
        time
        nonce
        */
        jwt.verify(token, lineLoginSecret, {
            issuer: issuer,
            audience: lineLoginChannelId,
            algorithms: algorithms,
            maxAge: maxAge
        }, function (err, decoded) {
            if (err)
                reject(err);
            else
                resolve(decoded)
        });
    })
}

let getFriendShipStatus = (accessToken) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: `https://api.line.me/friendship/v1/status`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
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
    auoth: auoth,
    getProfile: getProfile,
    jwtVerify: jwtVerify,
    verifyAccessToken: verifyAccessToken,
    getFriendShipStatus:getFriendShipStatus
}