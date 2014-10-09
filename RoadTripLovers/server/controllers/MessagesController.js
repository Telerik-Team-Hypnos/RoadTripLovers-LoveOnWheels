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
    },
	
	getByReceiverId: function(req, res, next) {
       Message.find({receiver: req.params.id}).exec(function(err, result) {
            if (err) {
                console.log('User could not be loaded: ' + err);
            }				
			//
			var cResult={
				title:result.title,
				body:result.body,
				postTime:result.postTime			
			};
			//
			User.findOne({_id: result.sender}).exec(function(err, senderUser) {
				if (err) {
					console.log('User could not be loaded: ' + err);
				}
				//
				cResult.sender=senderUser;
			});
			//			
            res.send(cResult);
        })
    }
};