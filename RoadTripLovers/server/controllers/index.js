var usersController = require('./UsersController');
var countriesController = require('./CountriesController');
var townsController = require('./TownsController');

module.exports = {
    users: usersController,
    countries: countriesController,
    towns: townsController,
};