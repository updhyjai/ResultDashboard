const express = require('express');
const app = express();
const ResultPortRouter = express.Router();
const ResultSchema = require('../models/ResultSchema');
const TempResultSchema = require('../models/TempResultSchema');


ResultPortRouter.route('/release').get(function(req,res){
    ResultSchema.find(function(err,results){
        if(err){
            console.log(err);
        }
        else{
            res.json(results);
        }
    });
});

ResultPortRouter.route('/tempresults/release').get(function(req,res){
    TempResultSchema.find(function(err,results){
        if(err){
            console.log(err);
        }
        else{
            res.json(results);
        }
    });
});

ResultPortRouter.route('/regression/release/:buildRelease').get(function(req,res){
    const release = req.params.buildRelease;
    ResultSchema.find({'Details.Release':release,'IsCiSuite':false},function(err,results){
        if(err){
        console.log(err);
        }
        else{
            res.json(results);
        }
    })
});

ResultPortRouter.route('/release/:buildRelease/:teamName').get(function(req,res){
    ResultSchema.find({'Details.Release':req.params.buildRelease,'TeamName':{$regex:req.params.teamName,$options:"$i"}},function(err,results){
        if(err){
        console.log(err);
        }
        else{
            console.log(results)
            res.json(results);
        }
    })
});

ResultPortRouter.route('/ci/release/:release/:teamName').get(function(req,res){
    ResultSchema.find({'TeamName':{$regex:req.params.teamName,$options:"$i"},'IsCiSuite':true,'Details.Release':req.params.release},function(err,results){
        if(err){
        console.log(err);
        }
        else{
            res.json(results);
        }
    })
});

ResultPortRouter.route('/tempresults/regression/release/:buildRelease').get(function(req,res){
    const release = req.params.buildRelease;
    TempResultSchema.find({'Details.Release':release,'IsCiSuite':false},function(err,results){
        if(err){
        console.log(err);
        }
        else{
            res.json(results);
        }
    })
});

ResultPortRouter.route('/tempresults/ci/release/:buildRelease/:teamName').get(function(req,res){
    const release = req.params.buildRelease;
    const teamName = req.params.teamName;
    TempResultSchema.find({'Details.Release':release,'TeamName':{$regex:req.params.teamName,$options:"$i"},'IsCiSuite':true},function(err,results){
        if(err){
        console.log(err);
        }
        else{
            res.json(results);
        }
    })
});

ResultPortRouter.route('/testPlanName/:testPlanName').get(function(req,res){
    const testPlanName = req.params.testPlanName;
    ResultSchema.find({'TestPlanName':testPlanName},function(err,results){
        if(err){
            console.log(err);
        }
        else{
            res.json(results);
        }
    })
});

ResultPortRouter.route('/testPlanName/:testPlanName').post(function(req,res){
    const testPlanName = req.params.testPlanName;
    ResultSchema.find({'TestPlanName':testPlanName},function(err,results){
        if(err){
            console.log(err);
        }
        else{
            results.push(req.body.details);
            results.save().then()
            res.json(results);
        }
    })
});

ResultPortRouter.route('/testPlanName/:testPlanName').get(function(req,res){
    const testPlanName = req.params.testPlanName;
    ResultSchema.find({'TestPlanName':testPlanName},function(err,results){
        if(err){
            console.log(err);
        }
        else{
            res.json(results);
        }
    })
});

ResultPortRouter.route('/testPlanName/:testPlanName/release/:release').put(function(req,res){
    const testPlanName = req.params.testPlanName;
    const release = req.params.release;
    
    console.log(108);
    
    ResultSchema.find({'testPlanName':testPlanName},function(err,details){
        if(details.length > 0){
            //console.log(details);
            ResultSchema.find({'TestPlanName':testPlanName,'Details.Release':release},function(err,results){
                if(results.length > 0){
                    console.log(115);
                    //console.log(results[0].details[0].results);
                    let i = 0;
                    for(i =0;i<results[0].Details.length;i++)
                    {
                        if(results[0].Details[i].Release == release)
                        break;
                    }
                    results[0].Details[i].Results.push(req.body.Details[0].Results[0]);
                    //console.log(results[0].details[0].results);
                    results[0].save().then(results=>{
                        console.log(results);
                        res.json(results);
                    })
                }
                else if(err){
                    console.log(err);
                }
                else{
                    console.log(123);
                    console.log(details);
                    details[0].Details.push(req.body.Details[0]);
                    details[0].save().then(re=>{
                        res.json(re);
                    })
                }
            })
        }
        else if(err){
            console.log(err);
        }  
        else{
            
            
            ResultSchema.create(req.body).then(rs =>{
            console.log(135);
            console.log(rs);
            res.json(rs);
            });
        }
    })
});
     


ResultPortRouter.route('/tempresults/edit/:id').get(function(req,res){
    const id = req.params.id;
    TempResultSchema.find({'_id':id},function(err,results){
        if(err){
        console.log(err);
        }
        else{
            res.json(results);
        }
    })
});

ResultPortRouter.route('/tempresults/delete/:id').delete(function(req,res){
    const id = req.params.id;
    console.log(id);
    TempResultSchema.findByIdAndRemove({_id:id},
    function(err,results){
        if(err) res.json(err);
        else res.json("Successfully removed");
    })
});

module.exports = ResultPortRouter;



