var fs = require('fs');
var User = require('mongoose').model('User');
var Photo = require('mongoose').model('Photo');

module.exports = {
    upload: function(req, res, next) {
        req.pipe(req.busboy);

        var myFile = {};

        req.busboy.on('file', function (fieldname, file, filename) {
            var url = req.user.username + "_" + filename;
            var extension = filename.split(".")[1];
            myFile.url = url;

            var path = __dirname + '/../../public/userimages/' + req.user.username + ".jpg";

            if (fs.existsSync(path)) {
                fs.unlinkSync(path);
            }

            var fstream = fs.createWriteStream(path);
            file.pipe(fstream);
        });

        req.busboy.on('finish', function() {
            console.log(myFile);
            Photo.remove({user: req.user._id}, function (err) {
                new Photo({
                    url: myFile.url,
                    user: req.user._id
                })
                    .save(function() {

                        res.redirect("/#/user-details/" + req.user._id);
                    });
            });
        });
    },
    getByUser: function(req, res, next) {
        console.log(req.params.id);
        Photo.findOne({user: req.params.id}).exec(function(err, result) {
            if (err){
                console.log(err);
                req.send(err)
            }
            console.log(result);
            res.send(result.url);
        });
    }
};