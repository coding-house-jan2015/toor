'use strict';

var Trip = require('../../models/trip');
var _ = require('lodash');
var moment = require('moment');

module.exports = {
  handler: function(request, reply) {
    Trip.findById(request.params.tripId, function(err, trip){
      trip.suggestions(request.auth.credentials, function(histogram){
        reply.view('templates/trips/show', {trip:trip, histogram:histogram, moment:moment, _:_});
      });
    });
  }
};
