'use strict';

var Trip = require('../../models/trip');

module.exports = {
  handler: function(request, reply) {
    Trip.destinations(request.payload, function(data){
      reply(data);
    });
  }
};
