var Country = require('mongoose').model('Country');

module.exports = {
    createItem: function(req, res) {
        var newItem = new Country(req.body);

        newItem.save(function(err, item) {
            if (err) {
                console.log('Failed to create new item: ' + err);
                return;
            }

            res.send(item);
        });

    },
    updateItem: function(req, res) {
        Country.findOne({name: req.body._id}).exec(function (err, item) {
            item = req.body;
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
        Country.find({}).exec(function(err, collection) {
            if (err) {
                console.log('Items could not be loaded: ' + err);
            }

            res.send(collection);
        })
    },
    deleteItem: function (req, res) {

    }
};