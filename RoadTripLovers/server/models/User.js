var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    username: {
        type: String,
        require: '{PATH} is required',
        unique: true
    },
    firstName: String,
    lastName: String,
    motto: String,
    birthDate: Date,
    town: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Town'
    },
    sex: String,
    isTruckDriver: Boolean,
    salt: String,
    hashPass: String,
    roles: [String]
});

userSchema.method({
    authenticate: function(password) {
        if (encryption.generateHashedPassword(this.salt, password) === this.hashPass) {
            return true;
        }
        else {
            return false;
        }
    }
});

var User = mongoose.model('User', userSchema);

module.exports.seedInitialUsers = function() {
    User.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find users: ' + err);
            return;
        }

//        User.remove({}, function(err) {
//            console.log('collection removed')
//        });

        if (collection.length === 0) {
            var salt;
            var hashedPwd;

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, '123456');

            User.create({
                username: 'superlover69',
                firstName: 'Ass',
                lastName: 'Ventura',
                motto: 'If I can\'t buy you a drink, at least let me fix your laptop.',
                isTruckDriver: true,
                salt: salt,
                hashPass: hashedPwd,
                roles: ['admin']
            });

			User.create({
                username: 'vladko_draivera',
                firstName: 'Volodqs',
                lastName: 'Kolarq',
                motto: '6te te vozq',
                isTruckDriver: true,
                salt: salt,
                hashPass: hashedPwd,
                roles: []
            });
			
            console.log('Users added to database...');
        }
    });
};