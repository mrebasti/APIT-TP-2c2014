//api/models/userModel.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: String,
	lastname: String,
	email: String,
	since: String
});

module.exports = mongoose.model('User', UserSchema);