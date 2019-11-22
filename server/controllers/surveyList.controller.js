const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const SurveyList = mongoose.model('SurveyList');

//create a new survey for showing survey lists
module.exports.createNewSurveyItem = (req, res, next) => {
    var surveyList = new SurveyList();
    surveyList.personId = req.body.personId;
    surveyList.questions = req.body.questions;
    surveyList.description = req.body.description;
    surveyList.startDate = req.body.startDate;
    surveyList.endDate = req.body.endDate;
    surveyList.isOpen = req.body.isOpen;
    surveyList.save((err, doc) => {
        if (!err) { res.send(doc); } else {
            if (err) {
                res.status(422).send(['Cannot create new survey.']);
            } else return next(err);
        }
    });
    console.log('Create new survey successfully.');
}

module.exports.surveyListing = (req, res) => {
    SurveyList.find((err, docs) => {
        if (!err) { res.send(docs); } else {
            console.log('Error in retrieving survey: ' + JSON.stringify(err, undefined, 2));
        }
    })
}

module.exports.getSurveyTable = (req, res, next) => {
    SurveyList.findOne({ _id: req._id }, (err, surveyTableItem) => {
        if (!surveyTableItem) {
            return res.status(400).json({ status: false, message: 'Survey record not found.' });
        } else {
            return res.status(200).json({ status: true, surveyTableItem: _.pick(surveyTableItem, ['_id', 'questions', 'description', 'startDate', 'endDate']) });
        }
    })
}