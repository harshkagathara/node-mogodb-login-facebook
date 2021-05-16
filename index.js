const express = require('express');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
require('./App/DB');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	resave: false,
	saveUninitialized: true,
	secret: 'SECRETKEY'
}));
app.use(passport.initialize());
app.use(passport.session());

require('./App/Middleware/setup');
require('./App/Routes/routes')(app);

app.listen(3000, () => {
	console.log('App listening on port ' + 3000);
});