const mongoose = require('mongoose');

const QuestionList = mongoose.model('QuestionList');

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