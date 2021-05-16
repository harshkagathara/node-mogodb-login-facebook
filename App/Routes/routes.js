module.exports = (app) => {
	const passport = require('passport');
    const isLoggedIn = require('../Middleware/isLogin');
    
	app.get('/', function(req, res) {
		res.render('pages/index.ejs');
	});
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('pages/profile.ejs', {
			user: req.user
		});
    });
    
	app.get('/error', isLoggedIn, function(req, res) {
		res.render('pages/error.ejs');
    });
    
	app.get('/auth/facebook', passport.authenticate('facebook', {
		scope: ['public_profile', 'email']
    }));
    
	app.get('/auth/facebook/callback', passport.authenticate('facebook', {
		successRedirect: '/profile',
		failureRedirect: '/error'
    }));
    
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
}