var mongoose = require('mongoose');
var User = require('mongoose').model('User');
var townSchema = require('mongoose').model('Town').schema;

var itemSchema = mongoose.Schema({
    towns: [townSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

var Trip = mongoose.model('Trip', itemSchema);
