const mongoose = require('mongoose');

var surveyListSchema = new mongoose.Schema({
    questions: [{
        offeredAnswer: String
    }],
    description: {
        subjectCode: String,
        subjecName: String,
        className: String,
        classId: String,
        surveyName: String,
        lecturer: String
    },
    startDate: String,
    endDate: String,
    isOpen: Boolean
})

mongoose.model('SurveyList', surveyListSchema);