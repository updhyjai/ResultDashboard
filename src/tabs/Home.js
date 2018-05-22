import React, { Component } from 'react';
import SummaryTable from '../components/SummaryTable';
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
        
       
}
    
    
    onReleaseChange = (val)=> {
        console.log(val);
     
        this.getReleaseSummary(val);
        
   }

   getReleaseSummary = (val)=>{
    axios.get('http://10.4.1.89:4200/result/release/'+ val)
    .then(response => {
      console.log("In table get" + val);
      console.log(response.data);
      var datas = new Array(response.data.length);
      var input = response.data;
      var tFail =0,tPass=0,tTc = 0,tETc =0;
      if(input.length > 0){
          let z = 0;
        for(var i=0;i<input.length;i++){
            datas[i+z] = [];
            var iInput = input[i];  
            console.log(iInput.suiteName);
            //datas[i+z].testPlanName = iInput.testPlanName;
            for(var j=0;j<iInput.details.length;j++){
                var jInput = iInput.details[j];
                if(jInput.release != val)
                      continue;
                //datas[i+z].release = jInput.release;

                    for(let k = 0;k<jInput.results.length;k++){
                        let kInput = jInput.results[k];
                        z = k;
                        datas[i+z] = [];
                        datas[i+z].testPlanName = iInput.testPlanName;
                        datas[i+z].release = jInput.release;
                        datas[i+z].totalBugFailure = kInput.totalBugFailure;
                        datas[i+z].buildNumber = kInput.buildNumber;
                        datas[i+z].suiteStatus = kInput.suiteStatus;
                        datas[i+z].totalTestcase = kInput.totalTestcase;
                        datas[i+z].totalTestcaseExecuted = kInput.totalTestcaseExecuted;
                        datas[i+z].totalPass = kInput.totalPass;
                        datas[i+z].totalFail = kInput.totalFail;
                        datas[i+z].executionDate = kInput.executionDate;
                        datas[i+z].bugDetail = kInput.bugDetail;
                        datas[i+z].failedTestCase = kInput.passedTestCase;
                        datas[i+z].remarks = kInput.remarks;
                        tFail += kInput.totalFail;
                        tPass += kInput.totalPass;
                        tTc  += kInput.totalTestcase;
                        tETc += kInput.totalTestcaseExecuted;
                        
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
        const summaryTable = (this.state.releaseSummary.length > 0 ) ?(<SummaryTable releaseSummary = {this.state.releaseSummary}/>):(<div></div>);
        const pieChart =(this.state.totalPass !== 0)? <Chart innerData ={ [{name : 'Total Test Case executed', value : this.state.totalTestcaseExecuted},{name : 'Total Test Case not executed', value : this.state.totalTestcase-this.state.totalTestcaseExecuted}]}
        outerData = {[{name:'Total Pass',value: this.state.totalPass},{name:'Total Fail',value: this.state.totalFail}]}/>:<div></div>;
        return (
            <div>
           <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3  border-bottom" style={{margin:20}}>
            <h1 className="h2">Execution Summary</h1>
            
          </div>
                
                    <div >
                    {pieChart} 
                   
                        </div>
                
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-top ">
            <h1 className="h2">Execution Summary Table</h1>
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