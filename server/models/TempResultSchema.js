var  mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TempResultSchema = new Schema({
    SuiteName:{
        type : String
    },
    TestPlanName :{
        type : String
    },
    Details:[{
        Release :{
            type : String
        },        
        Results :[{
            
            BuildNumber:{
                type : String
            },
        
            SuiteStatus:{
                type : String
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
                ValidationPointMessage : [{
                    type : String
                }],
                failureReason: {
                    type: String
                }
            }],
            PassedTestCase:[{
                TestCaseName :{
                    type: String
                },
                ValidationPointResults : [{
                    type : String
                    }
                ]
            }]
            
        }],
    }],    
    IsCiSuite:{
        type : Boolean,
        default : false
    },
    TeamName:{
        type : String
    }
},
{
    collection:'TempResults'
});

module.exports = mongoose.model('TempResultSchema', TempResultSchema);