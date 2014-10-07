var auth = require('./auth'),
    controllers = require('../controllers');

module.exports = function(app) {
    app.get('/api/users', controllers.users.getAllUsers);
    app.get('/api/users/:id', auth.isAuthenticated, controllers.users.getById);
    app.post('/api/users', controllers.users.createUser);
    app.put('/api/users', auth.isAuthenticated, controllers.users.updateUser);

    app.get('/partials/:partialArea/:partialName', function(req, res) {
        res.render('../../public/templates/' + req.params.partialArea + '/' + req.params.partialName)
    });

    app.post('/api/login', auth.login);
    app.post('/api/logout', auth.logout);

    // Country Requests
    app.get('/api/countries', auth.isInRole('admin'), controllers.countries.getAll);
    app.get('/api/countries/:id',auth.isInRole('admin'), controllers.countries.getById);
    app.post('/api/countries', auth.isInRole('admin'), controllers.countries.createItem);
    app.put('/api/countries', auth.isInRole('admin'), controllers.countries.updateItem);
//    app.delete('/api/countries/:id', controllers.countries.deleteItem);

    // Town Requests
    app.get('/api/towns', auth.isInRole('admin'), controllers.towns.getAll);
    app.get('/api/towns/:id', auth.isInRole('admin'), controllers.towns.getById);
    app.post('/api/towns', auth.isInRole('admin'), controllers.towns.createItem);
    app.put('/api/towns', auth.isInRole('admin'), controllers.towns.updateItem);
    app.delete('/api/towns', auth.isInRole('admin'), controllers.towns.deleteItem);

    app.get('/api/*', function(req, res) {
        res.status(404);
        res.end();
    });

    app.get('*', function(req, res) {
        res.render('index', {currentUser: req.user});
    });
};