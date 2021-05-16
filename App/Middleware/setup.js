const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const UserModel = require('../model/model');
require('dotenv').config();

passport.serializeUser(function(user, cb) {
	cb(null, user);
});
passport.deserializeUser(function(obj, cb) {
	cb(null, obj);
});

passport.use(new FacebookStrategy({
	clientID: process.env.ClientID,
	clientSecret: process.env.ClientSecret,
	callbackURL: process.env.CallbackURL,
},
  async function (accessToken, refreshToken, profile, done) {
	const currentUser = await UserModel.findOne({
		id: profile.id
	});
	if(currentUser) {
		return done(null, currentUser);
	} else {
		const newUser = await new UserModel({
			id: profile.id,
			displayName: profile.displayName,
		}).save();
		return done(null, newUser);
	}
}));