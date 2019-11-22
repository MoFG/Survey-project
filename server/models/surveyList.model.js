const mongoose = require('mongoose');

var surveyListSchema = new mongoose.Schema({
    personId: String,
    questions: [{
        questionId: String,
        offeredAnswer: String
    }],
    description: {
        surveyName: String,
        lecturer: String
    },
    startDate: String,
    endDate: String,
    isOpen: Boolean
})

mongoose.model('SurveyList', surveyListSchema);