var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    firstName: String,
    lastName: String,
    birthDate: Date,
    sex: String,
    profilePhoto: String,
    isTruckDriver: Boolean,
    town: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Town'
    }
});

var UserDetails = mongoose.model('UserDetails', itemSchema);