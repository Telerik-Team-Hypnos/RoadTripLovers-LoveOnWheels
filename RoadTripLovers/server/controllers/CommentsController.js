var Comment = require('mongoose').model('Comment');
var User = require('mongoose').model('User');

module.exports = {
    createItem : function(req, res){

        var data = {
            body: req.body.body,
            title: req.body.title,
            date: new Date(),
            sender: req.body.sender._id,
            receiver: req.body.receiver._id
        };

        var comment = new Comment(data);

        comment.save(function(err, success){
            if(err) {
                res.send(err);
                return;
            }

            res.send(success);
        });
    },
    getAll: function(req, res){
        Comment.find({}).exec(function(err, results){
            if(err) {
                console.log(err);
                return;
            }

            res.send(results)
        })
    },
    getByReceiver: function(req, res){
        Comment.find({receiver: req.params.id}).populate('sender', 'username').exec(function(err, result) {
            if (err) {
                console.log('Comments could not be loaded: ' + err);
                return;
            }

            console.log(result);

            res.send(result);
        })
    }
};