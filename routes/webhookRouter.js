const express = require('express'),
  router = express.Router(),
  co = require('co'),
  crypto = require('crypto');

const lineMiddleWare = require('../libs/lineBotService').middleware;
const lineEventService = require('../libs/lineEventService');

router.post('/', lineMiddleWare, (req, res) => {
  try {
    Promise
      .all(req.body.events.map(lineEventService.handleEvent))
      .then((result) => res.json(result))
      // .catch((e) => { console.log(e); });

  } catch (e) { }
});

module.exports = router;