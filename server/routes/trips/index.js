'use strict';

var Trip = require('../../models/trip');
var moment = require('moment');

module.exports = {
  handler: function(request, reply) {
    Trip.find({userId:request.auth.credentials._id}, function(err, trips){
      reply.view('templates/trips/index', {trips:trips, moment:moment});
    });
  }
};
