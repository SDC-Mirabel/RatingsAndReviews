var router = require('express').Router();
var controllers = require('./controllers.js');

router.get('/', controllers.getReviews);
// router.get('/meta', controllers.getReviewsMeta);

module.exports = router;