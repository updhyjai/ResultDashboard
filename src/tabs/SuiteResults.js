import React, { Component } from 'react';
import ResultTable from '../components/ResultTable';
import Dropdown from '../components/Dropdown';
import Chart from '../components/PieGraph';
import axios from 'axios';

export default class Home extends Component {
    constructor(props){
        super(props);
        
        this.state ={
            release:'',
            releaseSummary:[],
            totalPass:0,
            totalFail:0,
            totalTestcase:0,
            totalTestcaseExecuted:0
        };
        this.onReleaseChange = this.onReleaseChange.bind(this);
        this.getReleaseSummary = this.getReleaseSummary.bind(this);
        this.summary = [];
       
}
    
    
    onReleaseChange = (val)=> {
        console.log(val);
     
        this.getReleaseSummary(val);
        
   }

   getReleaseSummary = (val)=>{
    axios.get('http://10.4.1.89:4200/result/tempresults/release/'+ val)
    .then(response => {
      console.log("In table get" + val);
      console.log(response.data);
      var datas = new Array(response.data.length);
      var input = response.data;
      var tFail =0,tPass=0,tTc = 0,tETc =0;
      if(input.length > 0){
        console.log(input[0].Details[0].Results[0].BuildNumber);
        
        for(var i=0;i<input.length;i++){
            datas[i] = [];
            var iInput = input[i];  
            console.log(iInput.TestPlanName);
            datas[i]._id = iInput._id;
            datas[i].testPlanName = iInput.TestPlanName;
            for(var j=0;j<iInput.Details.length;j++){
                var jInput = iInput.Details[j];
                datas[i].release = jInput.Release;
                
                    for(var k = 0;k<jInput.Results.length;k++){
                        var kInput = jInput.Results[k];
                        datas[i].buildNumber = kInput.BuildNumber;
                        datas[i].suiteStatus = kInput.SuiiteStatus;
                        datas[i].totalTestcase = kInput.TotalTestcase;
                        datas[i].totalTestcaseExecuted = kInput.TotalTestcaseExecuted;
                        datas[i].totalPass = kInput.TotalPass;
                        datas[i].totalFail = kInput.TotalFail;
                        datas[i].executionDate = kInput.ExecutionDate;
                        datas[i].bugDetail = kInput.BugDetail;
                        datas[i].failedTestCase = kInput.PassedTestCase;
                        console.log(kInput.PassedTestCase);
                        tFail += kInput.TotalFail;
                        tPass += kInput.TotalPass;
                        tTc  += kInput.TotalTestcase;
                        tETc += kInput.TotalTestcaseExecuted;
                    }
                
            }
        }
        console.log(datas);
        console.log(tFail+" "+ tPass);
        }
      this.setState({releaseSummary:datas,totalFail:tFail,totalPass:tPass,totalTestcase:tTc,totalTestcaseExecuted:tETc})
    
     // this.setState(() =>({releaseSummary:response.data}),()=>{console.log(this.state.releaseSummary);});
      //this.tabRow(response.data);
      
      

    })
    .catch(function (error) {
      console.log(error);
    })
   }

    render() {
        const summaryTable = (this.state.releaseSummary.length > 0 ) ?(<ResultTable releaseSummary = {this.state.releaseSummary}/>):(<div></div>);
        
        
        return (
            <div>
           
                
                    
                
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom ">
            <h1 className="h2">Execution Summary Table (Unverified Results)</h1>
            <div className="form-control-lg mb-4 mb-md-0">
            <h6>Change Build Release here</h6>
              <Dropdown onReleaseChange = {this.onReleaseChange} />
            
          </div>
            </div>
                {summaryTable}
                    

                       
            </div>
        )
    }
}