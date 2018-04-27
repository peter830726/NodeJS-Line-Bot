const { channelSecret } = require('../config/constant');

const express = require('express'),
  router = express.Router(),
  co = require('co'),
  crypto = require('crypto'),
  winston = require('winston'),
  bodyParser = require('body-parser');

const lineMiddleWare = require('../libs/lineBotService').middleware;
const lineEventService = require('../libs/lineEventService');

router.post('/line', lineMiddleWare, (req, res) => {
  try {
    res.status(200);
    Promise
      .all(req.body.events.map(lineEventService.handleEvent))
      .then((result) => res.json(result))
      .catch((e) => { console.log(e); });
  } catch (e) {
  }
});

router.post('/facebook', bodyParser.json(), (req, res) => {
  try {
    console.log(req.body.entry[0].messaging);
    console.info("webhook post");
    return res.json();
  } catch (e) {
  }
});

router.get('/facebook', (req, res) => {
  try {
    console.log(req.query);
    let a = req.query['hub.challenge'];
    console.log(a);
    res.status(200).send(a);
  } catch (e) {
  }
});

module.exports = router;