'use strict';

var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var Message = require('./message');

var User;

var userSchema = mongoose.Schema({
    email: {type: String, required: true},
    twitter: {type: String, required: true},
    password: {type: String, required: true},
    createdAt: {type: Date, default: Date.now, required: true}
});

userSchema.statics.register = function(o, cb) {
  console.log('register USER', User);

  User.findOne({email:o.email}, function(err, user) {
    if (user) {return cb(true);}

    user = new User(o);

    user.password = bcrypt.hashSync(o.password, 8);
    user.save(function(err, u) {
      if(!err) {
        console.log('user saved', u.email);
        Message.registration(o.email, function(err, result) {
          if (err) {
            console.log('message error:', err);
            cb(err);
          } else {
            console.log('message send result:', result);
            cb(null, result);
          }
        });
      }
    });
  });
};

userSchema.statics.authenticate = function(o, cb) {
  User.findOne({email:o.email}, function(err, user) {
    if (!user) {return cb(true);}

    var isGood = bcrypt.compareSync(o.password, user.password);
    if (!isGood) {return cb(true);}

    cb(null, user);
  });
};

User = mongoose.model('User', userSchema);
module.exports = User;
