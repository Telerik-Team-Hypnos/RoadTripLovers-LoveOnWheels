var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
    name: String
});

var Country = mongoose.model('Country', itemSchema);

module.exports.seedInitial = function() {
    Country.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find countries: ' + err);
            return;
        }

        if (collection.length === 0) {
            Country.create({
                name: "Bulgaria"
            });

            Country.create({
                name: "Germany"
            });

            Country.create({
                name: "Italy"
            });

            Country.create({
                name: "France"
            });

            Country.create({
                name: "Spain"
            });

            Country.create({
                name: "Finland"
            });

            console.log('Countries Added to database added to database...');
        }
    });
};