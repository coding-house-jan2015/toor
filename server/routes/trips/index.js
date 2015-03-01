'use strict';

var Trip = require('../../models/trip');

module.exports = {
  handler: function(request, reply) {
    Trip.find({userId:request.auth.credentials._id}, function(err, trips){
      reply.view('templates/trips/index', {trips:trips});
    });
  }
};
