var  mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ResultSchema = new Schema({
    TestPlanName :{
        type : String
    },
    Details:[{
        Release :{
            type : String
        },        
        Results :[{
            BuildCombination :{
                type : String
            },
            BuildNumber:{
                type : String
            },
        
            SuiteStatus:{
                type : String,
                default : 'Fail'
            },
            TotalTestcase:{
                type : Number
            },
            TotalTestcaseExecuted:{
                type : Number
            },
            TotalPass:{
                type : Number
            },
            TotalFail:{
                type : Number
            },
            TotalBugFailure:{
                type: Number,
                default:0
            },
            ExecutionDate:{
                type : String
            },
            BugDetail:{
                type : String
            },
            FailedTestCase:[{
                TestCaseName :{
                    type: String
                },
                ValidationPointResults : [{
                    type : String
                    }],
                FailureReason: {
                        type: String
                    }

            }],
            PassedTestCase:[{
                TestCaseName :{
                    type: String
                },
                ValidationPointResults : [{
                    type : String
                }],
                FailureReason: {
                    type: String
                }
            }],
            Remarks:{
                type: String
            },
            AdditionalInfo:{
                type: String
            }
        }],
    }],    
    IsCiSuite:{
        type : Boolean,
        default : false
    },
    TeamName:{
        type : String,
        default : 'General'
    }
},
{
    collection:'results'
});

module.exports = mongoose.model('ResultSchema', ResultSchema);