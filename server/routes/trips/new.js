'use strict';

var moment = require('moment');

module.exports = {
  handler: function(request, reply) {
    reply.view('templates/trips/new', {moment:moment});
  }
};
