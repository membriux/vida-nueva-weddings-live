let express = require('express');
let config = require('../config')
let router = express.Router();
let fs = require('fs');
const youtube = require('../tools/youtube');
const { resourceLimits } = require('worker_threads');

router.get('/', function (req, res, next) {

  youtube.isLiveNow(function (data) {

    if (data.items.length > 0) {
      return res.render('live', {
        title: config.title,
        description: `Estamos en Vivo ahora! ${config.description}`,
        livestream: `https://www.youtube.com/embed/${data.items[0].id.videoId}?autoplay=1`
      });
    }
  });

  return res.render('live', {
    title: config.title,
    description: config.description
  });

});


module.exports = router;
