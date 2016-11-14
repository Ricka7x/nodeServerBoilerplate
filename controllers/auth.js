const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

function token(user){
  const timestamp = new Date().getTime();
  return jwt.encode({sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next){
  res.send({token: token(req.user)});
}

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  console.log(req.body);

  if(!email || !password){
    return res.status(422).send({error: 'username and password can\'t be blank'});
  }

  User.findOne({email: email}, function(err, existingUser){
    if(err){
      return next(err);
    }

    if(existingUser){
      return res.status(422).send({error: 'Email is taken'})
    }

    const user = new User({
      email: email,
      password: password
    });

    user.save(function(err, newUser){
      if(err){
        return next(err);
      }
      res.json({token: token(user)});
    });
  });
}
