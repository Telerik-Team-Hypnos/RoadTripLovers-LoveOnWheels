var fs = require('fs');
var User = require('mongoose').model('User');
var Photo = require('mongoose').model('Photo');

module.exports = {
    upload: function(req, res, next) {
        req.pipe(req.busboy);

        var files = [];

        req.busboy.on('file', function (fieldname, file, filename) {
            var url = req.user.username + "_" + filename;

            files[fieldname] = files[fieldname] || {};
            files[fieldname].fileName = filename;
            files[fieldname].url = url;

            var path = __dirname + '/../photos/' + url;

            if (fs.existsSync(path)) {
                fs.unlinkSync(path);
            }

            var fstream = fs.createWriteStream(path);
            file.pipe(fstream);
        });

        req.busboy.on('finish', function() {
            var count = 0;
            for(var file in files) {
                new Photo({
                    url: file.url,
                    user: req.user._id
                })
                .save(function() {
                    count++;
                    if (count == Object.keys(files).length) {
                        res.end();
                    }
                });
            };
        });
    },
    getByUser: function(req, res, next) {
        Photo.find({user: req.username._id}).exec(function(err, file) {
            if (err){
                console.log(err);
                req.send(err)
            }

            res.send(file.url);
        });
    }
};