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
    app.get('/api/countries', controllers.countries.getAll);
    app.get('/api/countries/:id', controllers.countries.getById);
    app.post('/api/countries', auth.isInRole('admin'), controllers.countries.createItem);
    app.put('/api/countries', auth.isInRole('admin'), controllers.countries.updateItem);

    // Town Requests
    app.get('/api/towns', controllers.towns.getAll);
    app.get('/api/towns/:id', controllers.towns.getById);
    app.post('/api/towns', auth.isInRole('admin'), controllers.towns.createItem);
    app.put('/api/towns', auth.isInRole('admin'), controllers.towns.updateItem);

    // Page Requests
    app.get('/api/pages', controllers.pages.getAll);
    app.get('/api/pages/:id', controllers.pages.getById);
    app.post('/api/pages', auth.isInRole('admin'), controllers.pages.createItem);
    app.put('/api/pages', auth.isInRole('admin'), controllers.pages.updateItem);

    // Trip Requests
    app.get('/api/trips', controllers.trips.getAll);
    app.get('/api/trips/:id', controllers.trips.getById);
    app.get('/api/trips/byuser/:user', controllers.trips.getByUserId);
    app.post('/api/trips', controllers.trips.createItem);
    app.put('/api/trips', controllers.trips.updateItem);

	//Messages Requests
	app.post('/api/messages/',controllers.messages.createItem);
	
    app.get('/api/*', function(req, res) {
        res.status(404);
        res.end();
    });

    app.get('*', function(req, res) {
        res.render('index', {currentUser: req.user});
    });
};