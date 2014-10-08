var Message = require('mongoose').model('Message');
var User=require('mongoose').model('User');

module.exports = {
	createItem: function(req, res) {	
		var now = new Date();		
		//
		var data={
			title:req.body.title,
			body:req.body.body,
			postTime:now,
			sender:req.body.sender,
			receiver:req.body.receiver
		};
		
		var newItem = new Message(data);

        newItem.save(function(err, item) {
            if (err) {
                console.log('Failed to create new item: ' + err);
                return;
            }

            res.send('Message sent.');
        });
    }
};