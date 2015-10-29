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
  //mongodb://ds045454.mongolab.com:45454/heroku_dw2tnllk
  db.connect('mongodb://ds045454.mongolab.com:45454/heroku_dw2tnllk');
}
console.log('End db connect');

router.get('/api/users', function(req, res){
  db.getUsers(function(err, users){
    res.send(users);
  });
  // Users.find(function(err, users){
  //   res.send(users);
  // });
});

router.post('/api/users', function(req, res, next){
  db.addUser(req.body, function(err, u){
    if (err) { return next(err); }
    res.json(u);
  })
  
  // var u = new User(req.body);
  // 
  // u.save(function(err, u){
  //   if (err) { return next(err); }
  //   res.json(u);
  // });
});



//Get questions /questions
// router.param('questionId', function(req, resp, next, id){
//   var q = Question.findById(id);
//   q.populate('user answers.user');
//   q.exec(function(err, question){
//     if (err) { return next(err); }
//     if (!question) { return next(new Error('cant find question')); }        
//     req.question = question;
//     return next();
//   });
// });

// router.param('questionId', function(req, resp, next, id){
//   var q = Question.findById(id);
//   q.populate('user answers');
//   q.exec(function(err, question){
//     if (err) { return next(err); }
//     if (!question) { return next(new Error('cant find question')); }        
//     
//     var options = { path: 'answers.user', model: 'users' }
//     Question.populate(question, options, function(err, q){
//       req.question = q;
//       return next();
//     })
//   });
// });

router.get('/api/questions', function(req, res, next){
  db.getQuestions(function(err, questions){
    if (err) { return next(err); }    
    res.json(questions)
  });
  
  // Question.find()
  //   .populate('user')
  //   .exec(function(err, questions){
  //     if (err) { return next(err); }
  //     
  //     var options = { path: 'answers.user', model: 'users' }
  //     Question.populate(questions, options, function(err, qs){
  //       if (err) { return next(err); }
  //       res.json(qs);
  //     });
  //   });
});

router.get('/api/questions/:questionId', function(req, res, next){
  
  console.log('GetQuestion: ID: '+ req.params.questionId)
  db.getQuestion(req.params.questionId, function(err, q){
    if (err) { return next(err); }
    res.json(q);
  })
  //res.json(req.question);  
});

router.post('/api/questions', function(req, res, next){
  db.addQuestion(req.body, function(err, q){
    if (err) { return next(err); }
    res.json(q);
  });
  // 
  // var q = new Question(req.body);
  //   
  // q.save(function(err, q){
  //   if (err) { return next(err); }
  //   res.json(q);
  // });
});

router.delete('/api/questions/:questionId', function(req, res, next){
  db.removeQuestion(req.params.questionId, function(err){
      if (err) { return next(err); }
      res.json("");
  })
  
  // req.question.remove(function(err){
  //     res.json("");
  // })
});

router.put('/api/questions/:questionId/upvote', function(req, res, next){
  db.upvoteQuestion(req.params.questionId, function(err, question){
    if (err) { return next(err); }    
    res.json(question);
  })
  
  // req.question.upvote(function(err, question){
  //   if (err) { return next(err); }    
  //   res.json(question);
  // })
});

router.put('/api/questions/:questionId/downvote', function(req, res, next){
  db.downvoteQuestion(req.params.questionId, function(err, question){
    if (err) { return next(err); }    
    res.json(question);
  })
  
  // req.question.downvote(function(err, question){
  //   if (err) { return next(err); }    
  //   res.json(question);
  // })
});

router.post('/api/questions/:questionId/answers', function(req, res, next){
  db.addAnswer(req.params.questionId, req.body, function(err, question){
    if (err) { return next(err); }    
    res.json(question);
  });
    
  // req.question.answers.push(req.body);
  // 
  // req.question.save(function(err, question){
  //   if (err) { return next(err); }    
  //   res.json(question);
  // });
});

router.put('/api/questions/:questionId/answers/:answerId/upvote', function(req, res, next){
  db.upvoteAnswer(req.params.questionId, req.params.answerId, function(err, q){
        if (err) { return next(err); }
        res.json(q);
      });
  // 
  // Question.findOneAndUpdate(
  //   {_id: req.params.questionId, 'answers._id': new ObjectId(req.params.answerId) },
  //   { $inc: { 'answers.$.votes': 1 } },
  //   { new: true })
  //   .populate('user')
  //   .exec(function(err, question){
  //     if (err) { return next(err); }
  //     
  //     var options = { path: 'answers.user', model: 'users' }
  //     Question.populate(question, options, function(err, q){
  //       if (err) { return next(err); }
  //       res.json(q);
  //     });
  //   });
});

router.put('/api/questions/:questionId/answers/:answerId/downvote', function(req, res, next){
  db.downvoteAnswer(req.params.questionId, req.params.answerId, function(err, q){
        if (err) { return next(err); }
        res.json(q);
      });
// 
//   Question.findOneAndUpdate(
//     {_id: req.params.questionId, 'answers._id': new ObjectId(req.params.answerId) },
//     { $inc: { 'answers.$.votes': -1 } },
//     { new: true })
//     .populate('user')
//     .exec(function(err, question){
//       if (err) { return next(err); }
//       
//       var options = { path: 'answers.user', model: 'users' }
//       Question.populate(question, options, function(err, q){
//         if (err) { return next(err); }
//         res.json(q);
//       });
//     });
});

router.delete('/api/questions/:questionId/answers/:answerId', function(req, res, next){
    db.removeAnswer(req.params.questionId, req.params.answerId, function(err, q){
        if (err) { return next(err); }
        res.json(q);
      });
  
  // Question.findByIdAndUpdate(
  //   { _id: req.params.questionId, 'answers._id': new ObjectId(req.params.answerId) },
  //   { $pull: { answers: { _id: new ObjectId(req.params.answerId) }}},
  //   { new: true },
  //   function(err, question) {
  //     if (err) { return next(err); }
  //     res.json(question);
  // });
});  


module.exports = router;
