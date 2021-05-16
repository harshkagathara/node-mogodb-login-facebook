var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
	displayName: String,
	id: {
		type: String,
		default: null
	}
}, {
	timestamps: true
});
module.exports = mongoose.model('users', UserSchema);