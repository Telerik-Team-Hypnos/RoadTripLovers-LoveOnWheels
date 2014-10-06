var Country = require('mongoose').model('Country');
var Town = require('mongoose').model('Town');

module.exports = {
    createItem: function(req, res) {
        var newItem = new Town(req.body);

        newItem.save(function(err, item) {
            if (err) {
                console.log('Failed to create new item: ' + err);
                return;
            }

            res.send(item);
        });

    },
    updateItem: function(req, res) {
        Town.findOne({_id: req.body._id}).exec(function (err, item) {

            item.name = req.body.name;
            item.country = req.body.country._id;

            item.save(function(err, item) {
                if (err) {
                    console.log('Failed to create new item: ' + err);
                    return;
                }

                res.send(item);
            })
        });
    },
    getAll: function(req, res) {
        Town.find({}).populate("country").exec(function(err, collection) {
            if (err) {
                console.log('Items could not be loaded: ' + err);
            }

            res.send(collection);
        })
    },
    getById: function(req, res, next) {
        Town.findOne({_id: req.params.id}).populate("country").exec(function(err, result) {
            if (err) {
                console.log('Item could not be loaded: ' + err);
            }

            res.send(result);
        })
    },
    deleteItem: function (req, res) {

    }
};