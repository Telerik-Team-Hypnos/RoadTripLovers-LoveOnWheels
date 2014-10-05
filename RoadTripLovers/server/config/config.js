var path = require('path');
var rootPath = path.normalize(__dirname + '/../../')

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/SimpleBlogSystem',
        port: process.env.PORT || 1234
    },
    production: {
        rootPath: rootPath,
        db: 'NO ONLINE DB YET',
        port: process.env.PORT || 1234
    }
};