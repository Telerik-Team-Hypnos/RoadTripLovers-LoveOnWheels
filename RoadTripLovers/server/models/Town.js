var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
    country: {
        type: Schema.Types.ObjectId,
        ref: 'Country'
    },
    name: String
});

var Town = mongoose.model('Town', itemSchema);