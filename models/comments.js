var mongoose = require('mongoose');

var commentsSchema = new mongoose.Schema({
	content: String,
	user: { type: mongoose.Schema.ObjectId, ref: 'users' },
	timeStamp: Date	
});

mongoose.model('comments', commentsSchema);
