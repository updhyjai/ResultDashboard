var  mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TempResultSchema = new Schema({
    
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
            }],            
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
        type : String
    }
},
{
    collection:'TempResults'
});

module.exports = mongoose.model('TempResultSchema', TempResultSchema);