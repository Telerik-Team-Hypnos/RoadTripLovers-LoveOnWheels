var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
    title:String,
    body:String,
    date: Date,
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});

var Comment = mongoose.model('Comment',itemSchema);