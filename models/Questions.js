var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var answersSchema = require('../models/answers');
var commentsSchema = require('../models/comments');

var questionsSchema = new Schema({
	title: String,
	content: String,
	user: { type: Schema.Types.ObjectId, ref: 'users' },
	timeStamp: { type: Date, default: Date.now },
	tags: String,
	votes: { type: Number, default: 0 },
	answers: [ answersSchema ],
	comments: [ commentsSchema ]
});

questionsSchema.methods.upvote = function(cb) {
	this.votes += 1;
	this.save(cb);
};

questionsSchema.methods.downvote = function(cb) {
	this.votes -= 1;
	this.save(cb);
};
// 
// questionsSchema.pre('remove', function(nextAction){
// 	var question = this;
// 	
// 	question.model('Class').update({
// 		_id: { $in: question.classes }
// 		},{
// 			$pull: { questions: question._id }
// 		},{
// 			multi: true
// 		},
// 		next
// 	);
// 	
// 	Async.each(question.answers, function(subId, next){
// 		answerSchema.findById(subId).exec(function(err, answer){
// 			answer.remove();
// 			next();
// 		}, function(){
// 			nextAction();
// 		})
// 	})
// })

mongoose.model('questions', questionsSchema);