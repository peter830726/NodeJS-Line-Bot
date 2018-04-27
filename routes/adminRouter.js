const express = require('express'),
    router = express.Router(),
    co = require('co'),
    crypto = require('crypto'),
    winston = require('winston');

const lineClient = require('../libs/lineBotService').client;

router.get('/', (req, res) => {
    res.json('admin get');
});

router.post('/', (req, res) => {
    res.json('admin post');
});

module.exports = router;