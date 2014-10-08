var mongoose = require('mongoose');
var user = require('../models/User');
var country = require('../models/Country');
var town = require('../models/Town');
var page = require('../models/Page');
var trip = require('../models/Trip');
var message = require('../models/Message');

module.exports = function(config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;

    db.once('open', function(err) {
        if (err) {
            console.log('Database could not be opened: ' + err);
            return;
        }

        console.log('Database up and running...')
    });

    db.on('error', function(err){
        console.log('Database error: ' + err);
    });

    user.seedInitialUsers();
    country.seedInitial();
    town.seedInitial();
    page.seedInitial();
	message.seedInitial();
};