var mongoose = require('mongoose');
var Country = require('mongoose').model('Country');

var itemSchema = mongoose.Schema({
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country'
    },
    name: String
});

var Town = mongoose.model('Town', itemSchema);

module.exports.seedInitial = function() {
    Town.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find countries: ' + err);
            return;
        }
// Delete once to seed!
//        Town.remove({}, function(err) {
//            console.log('collection removed')
//        });

        if (collection.length === 0) {
            // Bulgaria
            Country.findOne({name:"Bulgaria"}).exec(function (error, item) {
                Town.create({
                    name: "Sofia",
                    country: item
                });

                Town.create({
                    name: "Plovdiv",
                    country: item
                });

                Town.create({
                    name: "Varna",
                    country: item
                });

                Town.create({
                    name: "Bourgas",
                    country: item
                });

                Town.create({
                    name: "Pleven",
                    country: item
                });
            });

            // France
            Country.findOne({name:"France"}).exec(function (error, item) {
                Town.create({
                    name: "Paris",
                    country: item
                });

                Town.create({
                    name: "Lion",
                    country: item
                });

                Town.create({
                    name: "Nica",
                    country: item
                });

                Town.create({
                    name: "Cannes",
                    country: item
                });

                Town.create({
                    name: "Monaco",
                    country: item
                });
            });

            // Italy
            Country.findOne({name:"Italy"}).exec(function (error, item) {
                Town.create({
                    name: "Rome",
                    country: item
                });

                Town.create({
                    name: "Verona",
                    country: item
                });

                Town.create({
                    name: "Venice",
                    country: item
                });

                Town.create({
                    name: "Milano",
                    country: item
                });

                Town.create({
                    name: "Turino",
                    country: item
                });
            });

            console.log('Towns Added to database added to database...');
        }
    });
};