const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({message: 'this is the index route'});
});

module.exports = router;
