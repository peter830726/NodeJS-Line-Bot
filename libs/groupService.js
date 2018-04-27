const { channelId } = require('../config/constant'),
    { channelAccessToken } = require('../config/constant'),
    { channelSecret } = require('../config/constant');

const fs = require('fs'),
    co = require('co'),
    axios = require('axios'),
    queryString = require('querystring');

/*
取得用戶資訊(包括被封鎖或未加好友的用戶)
response:
status:200
data:{
    "displayName":"LINE taro",
    "userId":"U4af4980629...",
    "pictureUrl":"http://obs.line-apps.com/..."
}
*/
let getGroupMemberProfile = (groupId, userId) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: `https://api.line.me/v2/bot/group/${groupId}/member/${userId}`,
            headers: {
                'Authorization': `Bearer ${channelAccessToken}`
            }
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
僅適用於LINE @批准的帳戶或官方帳戶
取得userId(包括被封鎖或未加好友的用戶)
=================
request:
query parameter:{
    start:在響應中返回的JSON對象的下一個屬性中找到的continuation token的值。包含此參數以獲取組成員的下一個用戶標識數組。
}
=================
response:
status:200
data:{
    "memberIds":Array 或 string ,數量不固定,不同意OA條款之用戶不會被撈取,MAX:100 userIDs
   "next":"jxEWCEEP..."
}
*/
let getGroupMemberUserIDs = (groupId) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: `https://api.line.me/v2/bot/group/${groupId}/members/ids`,
            headers: {
                'Authorization': `Bearer ${channelAccessToken}`
            }
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
    getGroupMemberProfile: getGroupMemberProfile
}