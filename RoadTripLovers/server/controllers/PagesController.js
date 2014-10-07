var Page = require('mongoose').model('Page');

module.exports = {
    createItem: function(req, res) {
        var newItem = new Page(req.body);

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
        Page.update({_id: req.body._id}, itemToUpdate, function() {
            res.end();
        })
    },
    getAll: function(req, res) {
        Page.find({}).exec(function(err, collection) {
            if (err) {
                console.log('Items could not be loaded: ' + err);
            }

            res.send(collection);
        })
    },
    getById: function(req, res, next) {
        Page.findOne({_id: req.params.id}).exec(function(err, result) {
            if (err) {
                console.log('Item could not be loaded: ' + err);
            }

            res.send(result);
        })
    }
};