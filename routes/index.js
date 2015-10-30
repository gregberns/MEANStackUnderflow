var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId;
var db = require('../db/mongoHandler')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

require('../models/users');
require('../models/questions');
require('../models/answers');

var User = mongoose.model('users');
var Question = mongoose.model('questions');
var Answer = mongoose.model('answers');

var env = process.env.NODE_ENV;
console.log('Start db connect');
console.log('Env: ' + env)
if (env === 'development') {
  db.connect('mongodb://localhost/test');
} else if (env === 'production') {
  var PROD_MONGODB = process.env.MONGOLAB_URI || process.env.PROD_MONGODB;
  //PROD_MONGODB = require('url').parse(PROD_MONGODB);
  db.connect(PROD_MONGODB);
}
console.log('End db connect');

router.get('/api/users', function(req, res, next){
  db.getUsers(function(err, users){
    if (err) { return next(err); }
    res.send(users);
  });
});

router.post('/api/users', function(req, res, next){
  db.addUser(req.body, function(err, u){
    if (err) { return next(err); }
    res.json(u);
  })
});

router.delete('/api/users/:userId', function(req, res, next){
  db.removeUser(req.params.userId, function(err, u){
    if (err) { return next(err); }
    res.json(u);
  })
});

router.get('/api/questions', function(req, res, next){
  db.getQuestions(function(err, questions){
    if (err) { return next(err); }    
    res.json(questions)
  });
});

router.get('/api/questions/:questionId', function(req, res, next){
  
  console.log('GetQuestion: ID: '+ req.params.questionId)
  db.getQuestion(req.params.questionId, function(err, q){
    if (err) { return next(err); }
    res.json(q);
  })
});

router.post('/api/questions', function(req, res, next){
  db.addQuestion(req.body, function(err, q){
    if (err) { return next(err); }
    res.json(q);
  });
});

router.delete('/api/questions/:questionId', function(req, res, next){
  db.removeQuestion(req.params.questionId, function(err){
      if (err) { return next(err); }
      res.json("");
  })
});

router.put('/api/questions/:questionId/upvote', function(req, res, next){
  db.upvoteQuestion(req.params.questionId, function(err, question){
    if (err) { return next(err); }    
    res.json(question);
  })
});

router.put('/api/questions/:questionId/downvote', function(req, res, next){
  db.downvoteQuestion(req.params.questionId, function(err, question){
    if (err) { return next(err); }    
    res.json(question);
  })
});

router.post('/api/questions/:questionId/answers', function(req, res, next){
  db.addAnswer(req.params.questionId, req.body, function(err, question){
    if (err) { return next(err); }    
    res.json(question);
  });
});

router.put('/api/questions/:questionId/answers/:answerId/upvote', function(req, res, next){
  db.upvoteAnswer(req.params.questionId, req.params.answerId, function(err, q){
        if (err) { return next(err); }
        res.json(q);
      });
});

router.put('/api/questions/:questionId/answers/:answerId/downvote', function(req, res, next){
  db.downvoteAnswer(req.params.questionId, req.params.answerId, function(err, q){
        if (err) { return next(err); }
        res.json(q);
      });
});

router.delete('/api/questions/:questionId/answers/:answerId', function(req, res, next){
    db.removeAnswer(req.params.questionId, req.params.answerId, function(err, q){
        if (err) { return next(err); }
        res.json(q);
      });
});  


module.exports = router;
