var Message = require('mongoose').model('Message');
var User = require('mongoose').model('User');

module.exports = {
    createItem: function (req, res) {
        var now = new Date();
        //
        var data = {
            title: req.body.title,
            body: req.body.body,
            isRead: false,
            postTime: now,
            sender: req.body.sender,
            receiver: req.body.receiver
        };

        var newItem = new Message(data);

        newItem.save(function (err, item) {
            if (err) {
                console.log('Failed to create new item: ' + err);
                return;
            }

            res.send('Message sent.');
        });
    },

    getByReceiverId: function (req, res, next) {
        Message.find({receiver: req.params.id})
            .populate('sender', 'username')
            .exec(function (err, result) {
            if (err) {
                console.log('Messages could not be loaded: ' + err);
            }

            res.send(result);

            for (var i = 0; i < result.length; i++) {
                if(result[i].isRead === false) {
                    result[i].isRead = true;
                }
                result[i].save();
            }
        })
    },
    getNewMessagesByReceiverId: function(req, res){
        Message.find({receiver:req.params.id, isRead: false})
            .populate('sender', 'username')
            .exec(function(err, result){
                if (err) {
                    console.log('Messages could not be loaded: ' + err);
                }

                res.send(result);

                for (var i = 0; i < result.length; i++) {
                    if(result[i].isRead === false) {
                        result[i].isRead = true;
                    }
                    result[i].save();
                }
            })
    }
};