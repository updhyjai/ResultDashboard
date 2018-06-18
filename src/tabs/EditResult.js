import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';
import { isNullOrUndefined } from 'util';
const camelCase = require('camelcase');

export default class EditResult extends React.Component {
constructor(props){
    super(props);
    this.state = {resultData : [], Failures : [], resultToUpload : {}, suiteName : '',IsUploaded:false, IsValidated:false , ResultID:''};
    this.FailureRow = this.FailureRow.bind(this);
    this.onChangeSuiteName = this.onChangeSuiteName.bind(this);
    this.deleteResultFromTempDB = this.deleteResultFromTempDB.bind(this);

}

componentWillMount(){
    axios.get('http://10.4.1.89:4200/result/tempResults/edit/'+this.props.match.params.id)
    .then(res=> {
        this.setState({resultData : res.data[0], ResultID : res.data[0]._id});
        console.log(this.state.Failures);
        console.log(this.state.resultData);
        let response = res.data[0];
        let data = {};
        data.TestPlanName = response.TestPlanName;
        data.Details = new Array(1);
        data.Details[0] = {};
        data.Details[0].Release = response.Details[0].Release;
        data.IsCiSuite = response.IsCiSuite;
        if(response.TeamName && response.TeamName != null)
        data.TeamName = response.TeamName;
        else
        data.TeamName = "General";
        data.Details[0].Results =[];
        data.Details[0].Results[0] ={};
        data.Details[0].Results[0].BuildNumber = response.Details[0].Results[0].BuildNumber;
        data.Details[0].Results[0].TotalTestcase = response.Details[0].Results[0].TotalTestcase;
        data.Details[0].Results[0].TotalTestcaseExecuted = response.Details[0].Results[0].TotalTestcaseExecuted;
        data.Details[0].Results[0].TotalPass = response.Details[0].Results[0].TotalPass;
        data.Details[0].Results[0].TotalFail = response.Details[0].Results[0].TotalFail;
        data.Details[0].Results[0].ExecutionDate = response.Details[0].Results[0].ExecutionDate;
        if(response.Details[0].Results[0].SuiteStatus != null)
            data.Details[0].Results[0].SuiteStatus = response.Details[0].Results[0].SuiteStatus;
        else
            data.Details[0].Results[0].SuiteStatus = "Fail";
        data.Details[0].Results[0].BuildCombination = response.Details[0].Results[0].BuildCombination;
        let failures = response.Details[0].Results[0].FailedTestCase;
        
        data.Details[0].Results[0].FailedTestCase = [];
        for(let i = 0; i< failures.length; i++)
        {
            data.Details[0].Results[0].FailedTestCase[i] = {};
            data.Details[0].Results[0].FailedTestCase[i].TestCaseName = failures[i].TestCaseName;
            data.Details[0].Results[0].FailedTestCase[i].ValidationPointResults = [];
            let validations = failures[i].ValidationPointResults;
            if(validations != null)
            {
                for(let j = 0; j< validations.length; j++)
                {
                    data.Details[0].Results[0].FailedTestCase[i].ValidationPointResults[j] = [];
                    data.Details[0].Results[0].FailedTestCase[i].ValidationPointResults[j] = validations[j];
                    
                }
            }
        }
        let pass = response.Details[0].Results[0].PassedTestCase;
        data.Details[0].Results[0].PassedTestCase = [];
        for(let i = 0; i< pass.length; i++)
        {
            data.Details[0].Results[0].PassedTestCase[i] = {};
            data.Details[0].Results[0].PassedTestCase[i].TestCaseName = pass[i].TestCaseName;
            data.Details[0].Results[0].PassedTestCase[i].ValidationPointResults = [];
            let validations = pass[i].ValidationPointResults;
            if(validations != null)
            {
                for(let j = 0; j< validations.length; j++)
                {
                    data.Details[0].Results[0].PassedTestCase[i].ValidationPointResults[j] = [];
                    data.Details[0].Results[0].PassedTestCase[i].ValidationPointResults[j] = validations[j];
                    
                }   
           }
        }
        this.setState({resultToUpload : data});
        console.log(this.state.resultToUpload);
                
        })
        .catch(function(err){
            console.log(err);
        })
        
}


handleFailureListChange(index,event)
{
    let rstData = this.state.resultToUpload;
    let failedTc = rstData.Details[0].Results[0].FailedTestCase.slice(); 
    failedTc[index].FailureReason = event.target.value; 
    rstData.Details[0].Results[0].FailedTestCase = failedTc;
    this.setState({resultToUpload: rstData}); 
    console.log(this.state.resultToUpload);
}

FailureRow(){
  //  console.log(this.props.releaseSummary);
 // if( isNullOrUndefined(this.state.resultToUpload))
    if(this.state.resultToUpload && this.state.resultToUpload.Details) {
        return this.state.resultToUpload.Details[0].Results[0].FailedTestCase.map((failure, index) => {
            
            return (
                <div key={index} className="input-group">
                
                <Label sm ={4} >{failure.TestCaseName} </Label>
                    <input required  type="text"  placeholder = "SIEM-XXXXX or Random Failure "
                           className="form-control"
                           onChange={this.handleFailureListChange.bind(this, index)} value={failure.failureReason}/>
                </div>
            );
        });
    }

    return null;
}

onChangeSuiteName(event){
    if(this.state.resultToUpload && this.state.resultToUpload.Details) {
        let rstData = this.state.resultToUpload;
        let suiteName = event.target.value;
        rstData.SuiteName = suiteName;
        this.setState({resultToUpload:rstData});
        console.log(this.state.resultToUpload);
   
    }
    return null;
    
}

onChangeBuildNumber(e){
    if(this.state.resultToUpload && this.state.resultToUpload.Details) {
        let rstData = this.state.resultToUpload;
        let version = e.target.value;
        let splitter = version.lastIndexOf('.');
        let buildNumber = version.slice(splitter+1);
        let release = version.slice(0,splitter);
        rstData.Details[0].Release = release;
        rstData.Details[0].Results[0].BuildNumber = buildNumber;
       // rstData.suiteName = suiteName;
        this.setState({resultToUpload:rstData});
    }
    return null;
}

onChangeBugFailures(e){
    if(this.state.resultToUpload && this.state.resultToUpload.Details) {
        let rstData = this.state.resultToUpload;
        let failure = e.target.value;
        rstData.Details[0].Results[0].TotalBugFailure = parseInt(failure);
       // rstData.suiteName = suiteName;
        this.setState({resultToUpload:rstData});
        console.log(this.state.resultToUpload)
    }
    return null;
}
onChangeBugDetails(e){
    if(this.state.resultToUpload && this.state.resultToUpload.Details) {
        let rstData = this.state.resultToUpload;
        let bugDetail = e.target.value;
        rstData.Details[0].Results[0].BugDetail = bugDetail;
       // rstData.suiteName = suiteName;
        this.setState({resultToUpload:rstData});
        console.log(this.state.resultToUpload)
    }
    return null;
}

onChangeRemarks(e){
    if(this.state.resultToUpload && this.state.resultToUpload.Details) {
        let rstData = this.state.resultToUpload;
        let remarks = e.target.value;
        rstData.Details[0].Results[0].AdditionalInfo = remarks;
       // rstData.suiteName = suiteName;
        this.setState({resultToUpload:rstData});
        console.log(this.state.resultToUpload)
    }
    return null;
}
onChangeSuiteStatus(e){
    if(this.state.resultToUpload && this.state.resultToUpload.Details) {
        let rstData = this.state.resultToUpload;
        let suiteStatus = e.target.value;
        rstData.Details[0].Results[0].SuiteStatus = suiteStatus;
       // rstData.suiteName = suiteName;
        this.setState({resultToUpload:rstData});
        console.log(this.state.resultToUpload);
    }
    return null;
}

onChangeTeamName(e){
    if(this.state.resultToUpload && this.state.resultToUpload.Details) {
        let rstData = this.state.resultToUpload;
        let teamName = e.target.value;
        rstData.TeamName = teamName;
        this.setState({resultToUpload:rstData});
        console.log(this.state.resultToUpload);
    }
    return null;
}

validateResult()
{
    // data.testPlanName = response.TestPlanName;
    //     data.Details = new Array(1);
    //     data.Details[0] = {};
    //     data.Details[0].release = response.Details[0].Release;
    //     data.IsCiSuite = response.IsCiSuite;
    //     data.teamName = response.TeamName;
    //     data.Details[0].Results =[];
    //     data.Details[0].Results[0] ={};
    //     data = response.Details[0].Results[0].BuildNumber;
    //     data.Details[0].Results[0].totalTestcase = response.Details[0].Results[0].TotalTestcase;
    //     data.Details[0].Results[0].totalTestcaseExecuted = response.Details[0].Results[0].TotalTestcaseExecuted;
    //     data.Details[0].Results[0].totalPass = response.Details[0].Results[0].TotalPass;
    //     data.Details[0].Results[0].totalFail = response.Details[0].Results[0].TotalFail;
    //     data.Details[0].Results[0].executionDate = response.Details[0].Results[0].ExecutionDate;
    //     data.Details[0].Results[0].suiteStatus = response.Details[0].Results[0].SuiteStatus;
    //     data.Details[0].Results[0].buildCombination = response.Details[0].Results[0].BuildCombination;
    //     let failures = response.Details[0].Results[0].FailedTestCase;
    

}

onSubmit(e) {
    e.preventDefault();
    let data = this.state.resultToUpload;
    
    console.log(data);
    axios.put('http://10.4.1.89:4200/result/testPlanName/'+ data.TestPlanName +'/release/'+data.Details[0].Release, data)
    .then(
       res=> {
           
        console.log(res.data);
        this.deleteResultFromTempDB();
        this.props.history.push('/');
    })
        
       
    .catch(function(err){
        console.log(err);
        alert(err);
    });

   
    
    
}

deleteResultFromTempDB(){
    console.log(this.state.ResultID);
    axios.delete('http://10.4.1.89:4200/result/tempResults/delete/'+this.state.ResultID)
    
    .then(res => {
        
        console.log('Result uploaded to masterDB and Deleted from temp db');
        this.props.history.push('/');
    }
  

)
    .catch(function(err){
        console.log(err);
    })
}

  


  render() {
    let release = (this.state.resultToUpload.Details) ? this.state.resultToUpload.Details[0].Release +'.'+this.state.resultToUpload.Details[0].Results[0].BuildNumber  :'';
    let bugTC = (this.state.resultToUpload.Details) ? this.state.resultToUpload.Details[0].Results[0].TotalBugFailure : '';
    let bugDetails = (this.state.resultToUpload.Details) ? this.state.resultToUpload.Details[0].Results[0].BugDetail : '';
    let remarks = (this.state.resultToUpload.Details) ? this.state.resultToUpload.Details[0].Results[0].Remarks : '';
    let suiteStatus  = (this.state.resultToUpload.Details) ? this.state.resultToUpload.Details[0].Results[0].SuiteStatus : '';
    return (
        <div>
        <h2>Failure Analysis : {this.state.resultToUpload.testPlanName}</h2>
        <br /><br />
      
      <form onSubmit={this.onSubmit.bind(this)}>
                <div className="form-group">
                <Label sm={4} >Test Plan Name</Label>
                <Label> {this.state.resultToUpload.TestPlanName} </Label>
                </div>
                <br />
               
                <div className="input-group">
                    <Label sm={4} >Build Number</Label>
                    <Input type="text" className="form-control" onChange={this.onChangeBuildNumber.bind(this)} value={release} required/>
                </div>
                <br />
                <div className="input-group">
                    <Label sm={4} >Team Name</Label>
                    <select className="form-control" required  name="teamName" onChange = {this.onChangeTeamName.bind(this)} required value = {this.state.resultToUpload.TeamName}>
                        <option value="General">General</option>
                        <option value="Aqua">Aqua</option>
                        <option value="Blue">Blue</option>
                        <option value="Smoke">Smoke</option>                        
                    </select>
                </div>
                <br />
                <br />           
                <div>
                <Label sm={4} >Add Failure Analysis (If failure is due to bug, input Bug ID) </Label>
                   { this.FailureRow()}
                </div>
                <br />
                <div className="input-group">
                    <Label sm={4} >Test Cases Failed due to bug</Label>
                    <Input type="number"  placeholder = "0" className="form-control" onChange={this.onChangeBugFailures.bind(this)} ref={bugTC} required/>
                </div>
                <br />
                <div className="input-group">
                    <Label sm={4} >Bug Details</Label>
                    <Input type="text" placeholder = "SIEM-XXXXX, CASE-YYYYY" className="form-control" onChange={this.onChangeBugDetails.bind(this)} value={bugDetails} />
                </div> 

                <br />
                <div className="input-group">
                    <Label sm={4} >Additional Information</Label>
                    <textarea type="text" placeholder = "Agent-Flavour, Web Console Build, XM OS version, Agent OS" className="form-control" onChange={this.onChangeRemarks.bind(this)} value={remarks}  required/>
                </div>
                <br />
                <div className="input-group">
                    <Label sm={4} >Suite Status</Label>
                    <select className="form-control"  name="teamName" onChange = {this.onChangeSuiteStatus.bind(this)} value={suiteStatus} required>
                        <option value="Pass">Pass</option>
                        <option value="Fail">Fail</option>                       
                    </select>
                </div> 
                <br />
                <br />
                <div className="input-group">
                    <Input sm={4} type="submit" value="Update result" className="btn btn-primary"/>
                </div>
            </form>
      </div>
    );
  }
}
