var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
    title: String,
    content: String
});

var Page = mongoose.model('Page', itemSchema);

module.exports.seedInitial = function() {
    Page.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find items: ' + err);
            return;
        }

        if (collection.length === 0) {
            Page.create({
                title: "About Us",
                content: "About Us Content"
            });

            Page.create({
                title: "Terms Of Use",
                content: "Terms Of Use Content"
            });

            Page.create({
                title: "FAQ",
                content: "FAQ Content"
            });


            console.log('Pages Added to database...');
        }
    });
};