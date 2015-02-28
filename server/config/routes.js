'use strict';

module.exports = [
  {method: 'get', path: '/{param*}', config: require('../routes/general/static')},
  {method: 'get', path: '/', config: require('../routes/general/home')},
  {method: 'get', path: '/register', config: require('../routes/users/register')},
  {method: 'post', path: '/users', config: require('../routes/users/create')},
  {method: 'get', path: '/login', config: require('../routes/users/login')},
  {method: 'post', path: '/users/authenticate', config: require('../routes/users/authenticate')},
  {method: 'post', path: '/logout', config: require('../routes/users/logout')},

  {method: 'get', path: '/trips/new', config: require('../routes/trips/new')},
  {method: 'post', path: '/trips/destinations', config: require('../routes/trips/destinations')},
  {method: 'get', path: '/trips/{userId}/itinerary', config: require('../routes/trips/itinerary')}
];
