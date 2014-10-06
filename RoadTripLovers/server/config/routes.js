var auth = require('./auth'),
    controllers = require('../controllers');

module.exports = function(app) {
    app.get('/api/users', auth.isInRole('admin'), controllers.users.getAllUsers);
    app.post('/api/users', controllers.users.createUser);
    app.put('/api/users', auth.isAuthenticated, controllers.users.updateUser);

    app.get('/partials/:partialArea/:partialName', function(req, res) {
        res.render('../../public/templates/' + req.params.partialArea + '/' + req.params.partialName)
    });

    app.post('/api/login', auth.login);
    app.post('/api/logout', auth.logout);

    // Country Requests
    app.get('/api/countries', controllers.countries.getAll);
    app.get('/api/countries/:id', controllers.countries.getById);
    app.post('/api/countries', controllers.countries.createItem);
    app.put('/api/countries', controllers.countries.updateItem);
//    app.delete('/api/countries/:id', controllers.countries.deleteItem);

    // Town Requests
    app.get('/api/towns', controllers.towns.getAll);
    app.get('/api/towns/:id', controllers.towns.getById);
    app.post('/api/towns', controllers.towns.createItem);
    app.put('/api/towns', controllers.towns.updateItem);
    app.delete('/api/towns', controllers.towns.deleteItem);

    app.get('/api/*', function(req, res) {
        res.status(404);
        res.end();
    });

    app.get('*', function(req, res) {
        res.render('index', {currentUser: req.user});
    });
};