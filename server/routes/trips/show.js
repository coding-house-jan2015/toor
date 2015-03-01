'use strict';

var Trip = require('../../models/trip');
var _ = require('lodash');

module.exports = {
  handler: function(request, reply) {
    Trip.findById(request.params.tripId, function(err, trip){
      reply.view('templates/trips/show', {trip:trip});
    });
  }
};
