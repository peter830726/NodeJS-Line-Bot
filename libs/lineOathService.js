const { channelId } = require('../config/constant'),
    { channelAccessToken } = require('../config/constant'),
    { channelSecret } = require('../config/constant');

const fs = require('fs'),
    co = require('co'),
    axios = require('axios'),
    queryString = require('querystring');

/* 
short-lived:有效期限30天
long-lived:line 後台issue,後台issue的access token 機制(舊token還可以使用,但有時效性,並且時效性自己設定)
=============
response:
status:200
data:{
    access_token: access token 不能 refesh
    expires_in:
    token_type:'Bearer'
}
=============
Error response:
status:400
{
    error:錯誤摘要
    error_description:詳細錯誤資訊,不會每個情況都有此欄位
}
*/
let issueAccessToken = () => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: `https://api.line.me/v2/oauth/accessToken`,
            data: queryString.stringify({
                'grant_type': 'client_credentials',
                'client_id': `${channelId}`,
                'client_secret': `${channelSecret}`
            })
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

/* 
response:
status:200
data:空
=============================
Error response:
status:400
{
    error:錯誤摘要
    error_description:詳細錯誤資訊,不會每個情況都有此欄位
}
備註:若是指定了無效的令牌也不會出錯

*/
let revokeAccessToken = (channelAccessToken) => {    
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: `https://api.line.me/v2/oauth/revoke`,
            data: queryString.stringify({
                'access_token': channelAccessToken
            })
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

module.exports={
    issueAccessToken:issueAccessToken,
    revokeAccessToken:revokeAccessToken
}