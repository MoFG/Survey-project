const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const ctrlSurveyList = require('../controllers/surveyList.controller');
const ctrlQuestionList = require('../controllers/questionList.controller');

const jwtHelper = require('../config/jwtHelper');

//register, login and logout functions.
router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);

//survey list 
router.get('/surveyListing', ctrlSurveyList.surveyListing);
router.post('/createNewSurveyItem', ctrlSurveyList.createNewSurveyItem);
router.get('/:surveyId', ctrlSurveyList.getSurveyId);
router.put('/:surveyId', ctrlSurveyList.editSurveyId);
router.delete('/:surveyId', ctrlSurveyList.deleteSurveyId);

//question list 
router.get('/questionListing', ctrlQuestionList.questionListing);
router.post('/createNewQuestion', ctrlQuestionList.createNewQuestion);
module.exports = router;