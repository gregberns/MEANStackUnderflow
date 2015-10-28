var mongoose = require('mongoose');

var answersSchema = new mongoose.Schema({
	content: String,
	user: { type: mongoose.Schema.ObjectId, ref: 'users' },
	timeStamp: { type: Date, default: Date.now },
	votes: { type: Number, default: 0 },
	comments: [{ type: mongoose.Schema.ObjectId, ref: 'comments' }],
	question: { type: mongoose.Schema.ObjectId, ref: 'questions' }
});

answersSchema.methods.upvote = function(cb) {
	this.votes += 1;
	this.save(cb);
};

answersSchema.methods.downvote = function(cb) {
	this.votes -= 1;
	this.save(cb);
};

mongoose.model('answers', answersSchema);