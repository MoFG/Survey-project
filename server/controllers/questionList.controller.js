const mongoose = require('mongoose');

const QuestionList = mongoose.model('QuestionList');

var ObjectId = require('mongoose').Types.ObjectId;

//Create questions for questions array in survey item.
module.exports.createNewQuestion = (req, res, text) => {
    var questionList = new QuestionList();
    questionList.questionText = req.body.questionText;
    questionList.save((err, doc) => {
        if (!err) { res.send(doc); } else {
            if (err) {
                res.status(422).send(['Cannot create new question.']);
            } else return next(err);
        }
    });
    console.log('Create new question successfully.');
}

module.exports.questionListing = (req, res) => {
    QuestionList.find((err, docs) => {
        if (!err) { res.send(docs); } else {
            console.log('Error in retrieving question: ' + JSON.stringify(err, undefined, 2));
        }
    })
}

module.exports.getQuestionById = (req, res) => {
    if (!ObjectId.isValid(req.params.questionId))
        return res.status(400).send(`No records with given id: ${req.params.questionId}`);
    QuestionList.findById(req.params.questionId, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in getting question: ' + JSON.stringify(err, undefined, 2));
        }
    })
}