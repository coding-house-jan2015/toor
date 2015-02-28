'use strict';

var getDiff = require('../../views/helpers/getDiff');

module.exports = {
  handler: function(request, reply) {
    reply.view('templates/trips/itinerary', {getDiff:getDiff});
  }
};
