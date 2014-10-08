var mongoose = require('mongoose');
var User = require('mongoose').model('User');
var townSchema = require('mongoose').model('Town').schema;

var itemSchema = mongoose.Schema({
    startTown: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Town'
    },
    endTown: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Town'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    startDate: Date,
    endDate: Date
});

var Trip = mongoose.model('Trip', itemSchema);

module.exports.deleteAll = function() {
    Trip.find({}).exec(function(err, collection) {
        Trip.remove({}, function(err) {
            console.log('collection removed')
        });
    });
};