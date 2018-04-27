const { DOMAIN_URL } = require('../config/constant'),
    { lineLoginChannelId } = require('../config/constant');

const express = require('express'),
    router = express.Router(),
    co = require('co'),
    crypto = require('crypto'),
    winston = require('winston');

const lineLoginService = require('../libs/lineLoginService');

let redirect_uri = `https://7936cead.ngrok.io/lineLogin/hello`;

router.get('/v2.1/get_authorization_request', (req, res) => {
    try {
        //https://7936cead.ngrok.io/lineLogin/v2.1/get_authorization_request
        let scope = 'profile%20openid';//profile & openid
        let defaultUrl = 'https://access.line.me/oauth2/v2.1/authorize?';
        defaultUrl += "response_type=code";//告訴LINE需要返回code參數
        defaultUrl += `&client_id=${lineLoginChannelId}`;//辨識LINE CHANNEL為何
        defaultUrl += `&redirect_uri=${redirect_uri}`;//使用者認證+授權後,會轉導至網址去,並且此網址必須先於LINE後台註冊
        defaultUrl += `&state=stateString`;//防止csrf,並且應該為隨機亂數,不能是URL編碼的字符串
        defaultUrl += `&scope=${scope}`;//profile & openid,"%20" 可以同時使用
        defaultUrl += `&nonce=nonceString`;//防止 reply attacks,此參數存在於token中
        defaultUrl += `&prompt=consent`;//用於強制顯示同意畫面，即使用戶已經授予所有請求的權限。
        /*
        normal:包括在同意屏幕上添加一個機器人作為朋友的選項。
        aggressive:在用戶同意許可屏幕上的權限後，打開一個新的屏幕將bot添加為朋友。
        詳細: https://developers.line.me/en/docs/line-login/web/link-a-bot/
        */
        defaultUrl += `&bot_prompt=aggressive`;//顯示一個選項，可以在登錄時添加機器人作為朋友。
        
        console.log(defaultUrl);
        res.redirect(defaultUrl);
    } catch (e) {
    }
});

router.get('/v2/get_authorization_request', (req, res) => {
    try {
        //https://7936cead.ngrok.io/lineLogin/v2/get_authorization_request
        let scope = 'profile%20openid';//profile & openid
        let defaultUrl = 'https://access.line.me/dialog/oauth/weblogin?';
        defaultUrl += "response_type=code";//告訴LINE需要返回code參數
        defaultUrl += `&client_id=${lineLoginChannelId}`;//辨識LINE CHANNEL為何
        defaultUrl += `&redirect_uri=${redirect_uri}`;//使用者認證+授權後,會轉導至網址去,並且此網址必須先於LINE後台註冊
        defaultUrl += `&state=stateString`;//防止csrf,並且應該為隨機亂數,不能是URL編碼的字符串

        // defaultUrl += `&scope=${scope}`;
        // defaultUrl += `&nonce=nonceString`;
        // defaultUrl += `&prompt=consent`;
        // defaultUrl += `&bot_prompt=aggressive`;
        res.redirect(defaultUrl);
    } catch (e) {
    }
});

router.get('/hello', (req, res) => {
    co(function* () {
        try {
            /*
            req.query:{
                    friendship_status_changed:
                    true:如果登入期間,使用者狀態有改變,就為true
                        1.用戶添加了機器人作為朋友 
                        2.用戶解除封鎖機器人
                    false:如果在get_authorization_request的bot_prompt有設定參數的話,就會出現,並根據使用者狀態顯示false
                        1.用戶已經添加了機器人作為朋友 
                        2.用戶沒有添加機器人作為朋友 
                        3.用戶沒有解鎖機器人
                code:用於獲取訪問令牌的授權碼。有效期為10分鐘。此授權碼只能使用一次。
                state:包含在原始請求的授權URL中的狀態參數。AP應該驗證該值是否與原始請求中的值匹配。
            }
            */
            console.log(req.query);
            let code = req.query.code;
            /*
            驗證回傳的參數：
                access_token:訪問令牌(access_token)。有效期為30天。
                expires_in:訪問令牌(access_token)到期的時間（以秒為單位）。
                id_token:只有在scope中指定了openid時，才返回此字段。
                refresh_token:令牌用於獲取新的訪問令牌(access_token)。有效期至訪問令牌(access_token)到期後10天。
                scope:用戶授予的權限。
                token_type:Bearer。
            */
            //取得accessToken
            let data = yield lineLoginService.auoth('v2.1',code, redirect_uri);
            let accessToken = data.access_token;
            let id_token = data.id_token;
            //驗證 accessToken
            yield lineLoginService.verifyAccessToken(accessToken);
            let status = yield lineLoginService.getFriendShipStatus(accessToken);
            console.info('status',status);
            //獲取userId
            let payload = yield lineLoginService.jwtVerify(id_token);
            let userId = payload.sub;

            //獲取user 資訊
            let userProfile = yield lineLoginService.getProfile(accessToken);
            console.log({ data: data, userProfile });
            res.status(200);
            res.json({ userProfile});
        } catch (err) {
            if(err){
                console.log(err);
            }
        }
    })

});

module.exports = router;