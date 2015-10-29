var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId;

require('../models/users');
require('../models/questions');
require('../models/answers');
var User = mongoose.model('users');
var Question = mongoose.model('questions');
var Answer = mongoose.model('answers');

var dbInterface = {
	connect: function(connectionString){},
	getUsers: function(callback){},
	addUser: function(user, callback){},
	
	getQuestions: function(callback){},
	getQuestion: function(id, callback){},
	addQuestion: function(question, callback){},
	removeQuestion: function(id, callback){},
	upvoteQuestion: function(id, callback){},
	downvoteQuestion: function(id, callback){},
	
	addAnswer: function(qId, answer, callback){},
	upvoteAnswer: function(qId, aId, callback){},
	downvoteAnswer: function(qId, aId, callback){},
	removeAnswer: function(qId, aId, callback){}
	
};

var dbM = function(){};

dbM.prototype = Object.create(dbInterface);

dbM.prototype.connect = function(connectionString){
	//'mongodb://localhost/test'
	try {
		mongoose.connect(connectionString);
	} catch (err) {
		console.log('Error occured when connecting to the database. Error: ' + err)
	}	
}

dbM.prototype.getUsers = function(callback){
	User.find(callback);
}

dbM.prototype.addUser = function(user, callback){
	new User(req.body).save(callback);
}


dbM.prototype.getQuestions = function(callback){
	Question.find()
    .populate('user')
    .exec(function(err, questions){
      if (err) { return callback(err); }
      
      var options = { path: 'answers.user', model: 'users' }
      Question.populate(questions, options, function(err, qs){
        callback(err, qs)
      });
    });
};

dbM.prototype.getQuestion = function(qId, callback){
	console.log('GetQuestion: ID: '+ qId)
	var q = Question.findById(qId);
	q.populate('user answers');
	q.exec(function(err, question){
		if (err) { return callback(err); }
		if (!question) { return callback(new Error('cant find question')); }        
		
		var options = { path: 'answers.user', model: 'users' }
		Question.populate(question, options, function(err, q){
			callback(err, q)
		})
	});
};

dbM.prototype.addQuestion = function(question, callback){
	new Question(question).save(callback);
};

dbM.prototype.deleteQuestion = function(qId, callback){
	this.getQuestion(qId, function(err, question){
		if (err) { return callback(err); }
		question.remove(callback)
	})
};

dbM.prototype.upvoteQuestion = function(qId, callback){
	this.getQuestion(qId, function(err, question){
		if (err) { return callback(err); }
		question.upvote(callback);
	})
};

dbM.prototype.downvoteQuestion = function(qId, callback){
	this.getQuestion(qId, function(err, question){
		if (err) { return callback(err); }
		question.downvote(callback);
	})
};

dbM.prototype.addAnswer = function(qId, answer, callback){
	this.getQuestion(qId, function(err, question){
		if (err) { return callback(err); }
		question.answers.push(answer);  
  		question.save(callback);
	})
}

dbM.prototype.upvoteAnswer = function(qId, aId, callback){
	Question.findOneAndUpdate(
		{_id: qId, 'answers._id': new ObjectId(aId) },
		{ $inc: { 'answers.$.votes': 1 } },
		{ new: true })
		.populate('user')
		.exec(function(err, question){
			if (err) { return callback(err); }			
			var options = { path: 'answers.user', model: 'users' }
			Question.populate(question, options, callback);
		});
}

dbM.prototype.downvoteAnswer = function(qId, aId, callback){
	Question.findOneAndUpdate(
		{_id: qId, 'answers._id': new ObjectId(aId) },
		{ $inc: { 'answers.$.votes': -1 } },
		{ new: true })
		.populate('user')
		.exec(function(err, question){
			if (err) { return callback(err); }
			var options = { path: 'answers.user', model: 'users' }
			Question.populate(question, options, callback);
		});
}

dbM.prototype.removeAnswer = function(qId, aId, callback){
	Question.findByIdAndUpdate(
		{ _id: qId, 'answers._id': new ObjectId(aId) },
		{ $pull: { answers: { _id: new ObjectId(aId) }}},
		{ new: true },
		callback
	);
}

var mongoDatabase = module.exports = exports = new dbM;