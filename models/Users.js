var mongoose = require('mongoose');

var usersSchema = new mongoose.Schema({
	name: String,
	email: String	
});

mongoose.model('users', usersSchema);