const { notifyId } = require('../config/constant'),
    { DOMAIN_URL } = require('../config/constant');

const express = require('express'),
    router = express.Router(),
    co = require('co'),
    crypto = require('crypto'),
    winston = require('winston');

const lineClient = require('../libs/lineBotService').client,
    notifyService = require(`../libs/notifyService`);


router.get('/getNotifyURL', (req, res) => {
    try {
        let notifyURL = `https://notify-bot.line.me/oauth/authorize?response_type=code&client_id=${notifyId}&redirect_uri=${DOMAIN_URL}/notify/afterRedirect&scope=notify&state=thisIsState&response_mode=form_post`;
        res.json({ notifyURL: notifyURL });

    } catch (e) {
    }
});

router.get('/', (req, res) => {
    try {
        res.render('notify');
    } catch (e) {
    }
});

router.post('/afterRedirect', (req, res) => {
    try {
        co(function* () {
            try {
                let code = req.body.code;
                let state = req.body.state;
                console.log(state);
                let redirect_uri = `${DOMAIN_URL}/notify/afterRedirect`;
                let auothResult = yield notifyService.auoth(code, redirect_uri);
                console.log(auothResult);
                let accessToken = auothResult.access_token;
                console.log(accessToken);
                notifyService.notify(accessToken, '歡迎使用此平台，我們將會定期於早上8:00推送天氣消息');
            } catch (error) {
                console.log('err', error.message);
                console.log('err', error);
            }
        })
        res.status(200).json({ message: '恭喜你加入line Notify' });

    } catch (e) {


    }
});

module.exports = router;