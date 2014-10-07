var usersController = require('./UsersController');
var countriesController = require('./CountriesController');
var townsController = require('./TownsController');
var pagesController = require('./PagesController');
var tripsController = require('./TripsController');

module.exports = {
    users: usersController,
    countries: countriesController,
    towns: townsController,
    pages: pagesController,
    trips: tripsController
};