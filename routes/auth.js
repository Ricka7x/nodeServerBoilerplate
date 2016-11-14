const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');
const passportService = require('../services/passport');
const passport = require('passport');


const requireSignup = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});

router.post('/signup', auth.signup );
router.post('/signin', requireSignin, auth.signin );

module.exports = router;
