var mongoose = require('mongoose');

var fileSchema = mongoose.Schema({
    url: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

var Photo = mongoose.model('Photo', fileSchema);
