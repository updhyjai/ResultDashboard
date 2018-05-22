var  mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ResultSchema = new Schema({
    testPlanName :{
        type : String
    },
    details:[{
        release :{
            type : String
        },        
        results :[{
            buildNumber:{
                type : String
            },
        
            suiteStatus:{
                type : String,
                default : 'Fail'
            },
            totalTestcase:{
                type : Number
            },
            totalTestcaseExecuted:{
                type : Number
            },
            totalPass:{
                type : Number
            },
            totalFail:{
                type : Number
            },
            totalBugFailure:{
                type: Number,
                default:0
            },
            executionDate:{
                type : String
            },
            bugDetail:{
                type : String
            },
            failedTestCase:[{
                testCaseName :{
                    type: String
                },
                validationPointResults : [{
                    type : String
                    }],
                failureReason: {
                        type: String
                    }

            }],
            passedTestCase:[{
                testCaseName :{
                    type: String
                },
                validationPointResults : [{
                    type : String
                }],
                failureReason: {
                    type: String
                }
            }],
            remarks:{
                type: String
            }
        }],
    }],    
    isCiSuite:{
        type : Boolean,
        default : false
    },
    teamName:{
        type : String,
        default : 'General'
    }
},
{
    collection:'results'
});

module.exports = mongoose.model('ResultSchema', ResultSchema);