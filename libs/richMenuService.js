const { channelAccessToken } = require('../config/constant'),
    { channelSecret } = require('../config/constant');
const fs = require('fs'),
    co = require('co'),
    axios = require('axios');

let getRichMenu = (richMenuId) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: `https://api.line.me/v2/bot/richmenu/${richMenuId}`,
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

let createRichMenu = () => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: `https://api.line.me/v2/bot/richmenu`,
            headers: {
                'Authorization': `Bearer ${channelAccessToken}`,
                'Content-Type': 'application/json',

            },
            data: {
                "size": {
                    "width": 2500,
                    "height": 1686
                },
                "selected": true,
                "name": "Nice richmenu",
                "chatBarText": "Tap to open",
                "areas": [
                    {
                        "bounds": {
                            "x": 0,
                            "y": 0,
                            "width": 2500,
                            "height": 1686
                        },
                        "action": {
                            "type": "postback",
                            "data": "action=buy&itemid=123"
                        }
                    }
                ]
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

let getRichMenuList = () => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: `https://api.line.me/v2/bot/richmenu/list`,
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

let deleteRichMenu = (richMenuId) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'delete',
            url: `https://api.line.me/v2/bot/richmenu/${richMenuId}`,
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

let getRichMenuIdOfUser = (userId) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: `https://api.line.me/v2/bot/user/${userId}/richmenu`,
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

let linkRichMenuIdToUser = (userId, richMenuId) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: `https://api.line.me/v2/bot/user/${userId}/richmenu/${richMenuId}`,
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

let unlinkRichMenuFromUser = (userId) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'delete',
            url: `https://api.line.me/v2/bot/user/${userId}/richmenu`,
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

let downloadRichMenuImage = (richMenuId) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: `https://api.line.me/v2/bot/richmenu/${richMenuId}/content`,
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


let uploadRichMenuImage = (richMenuId, data) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: `https://api.line.me/v2/bot/richmenu/${richMenuId}/content`,
            headers: {
                'Authorization': `Bearer ${channelAccessToken}`,
                'Content-Type': 'image/jpeg',
                'Content-Length': '8'
            },
            data: data
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

co(function* () {
    try {
        var richMenuId = 'richmenu-20ea9b4c21bd1e18d6c942543c8169d5';
        var noImageRichMenuId = 'richmenu-5e494f45de1b9f6c00566a85789fece3';
        var userId = 'U1f9080d8a1572dcdf08b180ecd8a8081';
        // let result = yield getRichMenu(noImageRichMenuId);
        // yield upload(richMenuId);
        // let result = yield getRichMenuList();
        // let reuslt = yield deleteRichMenu(richMenuId);
        // yield getRichMenuIdOfUser(userId);
        // let result = yield linkRichMenuIdToUser(userId, noImageRichMenuId);
        // let result = yield unlinkRichMenuFromUser(userId);
        // let result = yield downloadRichMenuImage(richMenuId);
        // let result = yield createRichMenu();
        // let result = yield uploadRichMenuImage(richMenuId, data);
        // console.log(result);
    } catch (err) {
        console.info(`Error status`,err.response.status);
        console.log(err.response.data);
    }
})


module.exports = {
    getRichMenu: getRichMenu
}