var Town = require('mongoose').model('Town');
var User = require('mongoose').model('User');
var Trip = require('mongoose').model('Trip');

module.exports = {
    createItem: function(req, res) {
        var newItem = new Trip(req.body);

        newItem.save(function(err, item) {
            if (err) {
                console.log('Failed to create new item: ' + err);
                return;
            }

            res.send(item);
        });

    },
    updateItem: function(req, res) {

        var itemToUpdate = req.body;

        Trip.update({_id: req.body._id}, itemToUpdate, function() {
            res.end();
        })
    },
    getAll: function(req, res) {
        Trip.find({}).populate("towns").exec(function(err, collection) {
            if (err) {
                console.log('Items could not be loaded: ' + err);
            }

            res.send(collection);
        })
    },
    getByUserId: function(req, res, next) {
        Trip.findOne({user: req.params.user}).populate("towns").exec(function(err, result) {
            if (err) {
                console.log('Items could not be loaded: ' + err);
            }

            res.send(result);
        })
    }
};