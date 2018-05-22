import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';
import { isNullOrUndefined } from 'util';
const camelCase = require('camelcase');

export default class EditResult extends React.Component {
constructor(props){
    super(props);
    this.state = {resultData : [], Failures : [], resultToUpload : {}, suiteName : ''};
    this.FailureRow = this.FailureRow.bind(this);
    this.onChangeSuiteName = this.onChangeSuiteName.bind(this);

}

componentWillMount(){
    axios.get('http://10.4.1.89:4200/result/tempresults/edit/'+this.props.match.params.id)
    .then(res=> {
        this.setState({resultData : res.data[0], Failures : res.data[0].Details[0].Results[0].PassedTestCase});
        console.log(this.state.Failures);
        console.log(this.state.resultData);
        let response = res.data[0];
        let data = {};
        data.testPlanName = response.TestPlanName;
        data.details = new Array(1);
        data.details[0] = {};
        data.details[0].release = response.Details[0].Release;
        data.details[0].results =[];
        data.details[0].results[0] ={};
        data.details[0].results[0].buildNumber = response.Details[0].Results[0].BuildNumber;
        data.details[0].results[0].totalTestcase = response.Details[0].Results[0].TotalTestcase;
        data.details[0].results[0].totalTestcaseExecuted = response.Details[0].Results[0].TotalTestcaseExecuted;
        data.details[0].results[0].totalPass = response.Details[0].Results[0].TotalPass;
        data.details[0].results[0].totalFail = response.Details[0].Results[0].TotalFail;
        data.details[0].results[0].executionDate = response.Details[0].Results[0].ExecutionDate;
        let failures = response.Details[0].Results[0].FailedTestCase;
        
        data.details[0].results[0].failedTestCase = [];
        for(let i = 0; i< failures.length; i++)
        {
            data.details[0].results[0].failedTestCase[i] = {};
            data.details[0].results[0].failedTestCase[i].testCaseName = failures[i].TestCaseName;
            data.details[0].results[0].failedTestCase[i].validationPointResults = [];
            let validations = failures[i].ValidationPointResults;
            for(let j = 0; j< validations.length; j++)
            {
                data.details[0].results[0].failedTestCase[i].validationPointResults[j] = [];
                data.details[0].results[0].failedTestCase[i].validationPointResults[j] = validations[j];
                
            }   
        }
        let pass = response.Details[0].Results[0].PassedTestCase;
        data.details[0].results[0].passedTestCase = [];
        for(let i = 0; i< pass.length; i++)
        {
            data.details[0].results[0].passedTestCase[i] = {};
            data.details[0].results[0].passedTestCase[i].testCaseName = pass[i].TestCaseName;
            data.details[0].results[0].passedTestCase[i].validationPointResults = [];
            let validations = pass[i].ValidationPointResults;
            for(let j = 0; j< validations.length; j++)
            {
                data.details[0].results[0].passedTestCase[i].validationPointResults[j] = [];
                data.details[0].results[0].passedTestCase[i].validationPointResults[j] = validations[j];
                
            }   
        }
        //data.details.results.failedTestCase = response.Details[0].Results[0].FailedTestCase;
        //data.details.results.passedTestCase = response.Details[0].Results[0].passedTestCase;
        
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
    let failedTc = rstData.details[0].results[0].passedTestCase.slice(); 
    failedTc[index].failureReason = event.target.value; 
    rstData.details[0].results[0].passedTestCase = failedTc;
    this.setState({resultToUpload: rstData}); 
    console.log(this.state.resultToUpload);
}

FailureRow(){
  //  console.log(this.props.releaseSummary);
 // if( isNullOrUndefined(this.state.resultToUpload))
    if(this.state.resultToUpload && this.state.resultToUpload.details) {
        return this.state.resultToUpload.details[0].results[0].passedTestCase.map((failure, index) => {
            
            return (
                <div key={index} className="input-group">
                
                <Label sm ={4} >{failure.testCaseName} </Label>
                    <input  type="text"  placeholder = "SIEM-XXXXX or Random Failure "
                           className="form-control"
                           onChange={this.handleFailureListChange.bind(this, index)} value={failure.failureReason}/>
                </div>
            );
        });
    }

    return null;
}

onChangeSuiteName(event){
    if(this.state.resultToUpload && this.state.resultToUpload.details) {
        let rstData = this.state.resultToUpload;
        let suiteName = event.target.value;
        rstData.suiteName = suiteName;
        this.setState({resultToUpload:rstData});
        console.log(this.state.resultToUpload);
   
    }
    return null;
    
}

onChangeBuildNumber(e){
    if(this.state.resultToUpload && this.state.resultToUpload.details) {
        let rstData = this.state.resultToUpload;
        let version = e.target.value;
        let splitter = version.lastIndexOf('.');
        let buildNumber = version.slice(splitter+1);
        let release = version.slice(0,splitter);
        rstData.details[0].release = release;
        rstData.details[0].results[0].buildNumber = buildNumber;
       // rstData.suiteName = suiteName;
        this.setState({resultToUpload:rstData});
    }
    return null;
}

onChangeBugFailures(e){
    if(this.state.resultToUpload && this.state.resultToUpload.details) {
        let rstData = this.state.resultToUpload;
        let failure = e.target.value;
        rstData.details[0].results[0].totalBugFailure = parseInt(failure);
       // rstData.suiteName = suiteName;
        this.setState({resultToUpload:rstData});
        console.log(this.state.resultToUpload)
    }
    return null;
}
onChangeBugDetails(e){
    if(this.state.resultToUpload && this.state.resultToUpload.details) {
        let rstData = this.state.resultToUpload;
        let bugDetail = e.target.value;
        rstData.details[0].results[0].bugDetail = bugDetail;
       // rstData.suiteName = suiteName;
        this.setState({resultToUpload:rstData});
        console.log(this.state.resultToUpload)
    }
    return null;
}

onChangeRemarks(e){
    if(this.state.resultToUpload && this.state.resultToUpload.details) {
        let rstData = this.state.resultToUpload;
        let remarks = e.target.value;
        rstData.details[0].results[0].remarks = remarks;
       // rstData.suiteName = suiteName;
        this.setState({resultToUpload:rstData});
        console.log(this.state.resultToUpload)
    }
    return null;
}
onChangeSuiteStatus(e){
    if(this.state.resultToUpload && this.state.resultToUpload.details) {
        let rstData = this.state.resultToUpload;
        let suiteStatus = e.target.value;
        rstData.details[0].results[0].suiteStatus = suiteStatus;
       // rstData.suiteName = suiteName;
        this.setState({resultToUpload:rstData});
        console.log(this.state.resultToUpload);
    }
    return null;
}

onChangeTeamName(e){
    if(this.state.resultToUpload && this.state.resultToUpload.details) {
        let rstData = this.state.resultToUpload;
        let teamName = e.target.value;
        rstData.teamName = teamName;
        this.setState({resultToUpload:rstData});
        console.log(this.state.resultToUpload);
    }
    return null;
}

onSubmit(e) {
    e.preventDefault();
    let data = this.state.resultToUpload;
    console.log(data);
    axios.put('http://10.4.1.89:4200/result/testPlanName/'+ data.testPlanName +'/release/'+data.details[0].release, data)
    .then(res=> console.log(res.data))
    .catch(function(err){
        console.log(err);
    });
    
}

  


  render() {
    let release = (this.state.resultToUpload.details) ? this.state.resultToUpload.details[0].release +'.'+this.state.resultToUpload.details[0].results[0].buildNumber  :'';
    let bugTC = (this.state.resultToUpload.details) ? this.state.resultToUpload.details[0].results[0].totalBugFailure : '';
    let bugDetails = (this.state.resultToUpload.details) ? this.state.resultToUpload.details[0].results[0].bugDetail : '';
    let remarks = (this.state.resultToUpload.details) ? this.state.resultToUpload.details[0].results[0].remarks : '';
    return (
        <div>
        <h2>Failure Analysis : {this.state.resultToUpload.testPlanName}</h2>
        <br /><br />
      
      <form onSubmit={this.onSubmit.bind(this)}>
                <div className="form-group">
                <Label sm={4} >Test Plan Name</Label>
                <Label> {this.state.resultToUpload.testPlanName} </Label>
                </div>
                <br />
               
                <div className="input-group">
                    <Label sm={4} >Build Number</Label>
                    <Input type="text" className="form-control" onChange={this.onChangeBuildNumber.bind(this)} value={release}/>
                </div>
                <br />
                <div className="input-group">
                    <Label sm={4} >Team Name</Label>
                    <select className="form-control"  name="teamName" onChange = {this.onChangeTeamName.bind(this)}>
                        <option value="General" selected>General</option>
                        <option value="Aqua">Aqua</option>
                        <option value="Blue">Blue</option>
                        <option value="Red">Red</option>                        
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
                    <Input type="number"  placeholder = "0" className="form-control" onChange={this.onChangeBugFailures.bind(this)} ref={bugTC}/>
                </div>
                <br />
                <div className="input-group">
                    <Label sm={4} >Bug Details</Label>
                    <Input type="text" placeholder = "SIEM-XXXXX, CASE-YYYYY" className="form-control" onChange={this.onChangeBugDetails.bind(this)} value={bugDetails}/>
                </div> 

                <br />
                <div className="input-group">
                    <Label sm={4} >Additional Information</Label>
                    <textarea type="text" placeholder = "Agent-Flavour, Web Console Build, XM OS version, Agent OS" className="form-control" onChange={this.onChangeRemarks.bind(this)} value={remarks}/>
                </div>
                <br />
                <div className="input-group">
                    <Label sm={4} >Suite Status</Label>
                    <select className="form-control"  name="teamName" onChange = {this.onChangeSuiteStatus.bind(this)}>
                        <option value="Pass" selected>Pass</option>
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
