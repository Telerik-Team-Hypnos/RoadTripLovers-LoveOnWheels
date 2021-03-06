var mongoose = require('mongoose');

var itemSchema=mongoose.Schema({
	title:String,
	body:String,
	postTime: Date,
    isRead: Boolean,
	sender:{
		type: mongoose.Schema.Types.ObjectId,
		ref:'User'
	},
	receiver:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'User'
	}
});

var Message=mongoose.model('Message',itemSchema);

module.exports.seedInitial = function() {
    Message.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find items: ' + err);
            return;
        }

        if (collection.length === 0) {
		
            Message.create({
                title: "new Message",
                body: "Blah, blah, blah...",
                isRead:false,
				postTime: new Date(),
				sender:null,
				receiver:null
            });            

            console.log('Messages Added to database...');
        }
    });
};