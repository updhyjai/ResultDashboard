import React, { Component } from 'react';
import axios from 'axios';
import TrendChart from '../components/TrendChart';
import chartData from '../models/data.json';
import SummaryTable from '../components/SummaryTable';
import Dropdown from '../components/Dropdown';

export default class Aqua extends Component {
    constructor(props){
        super(props);
        this.state={
            releaseSummary:[],
            trendChartData :[]
        };

    }
    componentDidMount(){
        axios.get('http://10.4.1.89:4200/result/ci/red')
        .then(response=>{
            console.log(response.data);
            var count = response.data.length;
            if(count>0)
            {
                let array = response.data;
                let trendData = [];
                for (let i = 0; i < array.length; i++) {
                    let iArray = array[i];
                    for (let j = 0; j < iArray.details.length; j++) {
                        let jArray = iArray.details[j];
                        for (let k = 0; k < jArray.results.length; k++) {
                            let kArray = jArray.results[k];
                            trendData[i] = {};
                            trendData[i].Build = jArray.release + '.' + kArray.buildNumber;
                            trendData[i].Fail = kArray.totalFail;
                            trendData[i].Pass = kArray.totalPass;
                            trendData[i].Total = kArray.totalTestcaseExecuted;
                            trendData[i].Date = kArray.executionDate;
                        }
                        
                    }
                    
                    
                }    
                //console.log(trendData);
                this.setState({trendChartData:trendData});
                console.log(this.state.trendChartData);
            }
            
        })
        .catch(function(error){
            console.log(error);
        }
        )
    }
    
    onReleaseChange = (val)=> {
        console.log(val);
     
        this.getReleaseSummary(val);
        
   }

   getReleaseSummary = (val)=>{
    axios.get('http://10.4.1.89:4200/result/release/'+ val + '/red') 
    .then(response => {
      console.log("In table get" + val);
      console.log(response.data);
      var datas = new Array(response.data.length);
      //var chartData = new Array(response.length);
      var input = response.data;
    console.log(chartData);
      var tFail =0,tPass=0,tTc = 0,tETc =0;
      if(input.length > 0){
      //console.log(input[1].details[0].results[0].buildNumber);
      
      for(var i=0;i<input.length;i++){
        datas[i] = [];
      var iInput = input[i];  
      for(var j=0;j<iInput.details.length;j++){
            var jInput = iInput.details[j];
           
            
              for(var k = 0;k<jInput.results.length;k++){
                  var kInput = jInput.results[k];
                  console.log(jInput.release);
                  if(jInput.release != val)
                      continue;
                  datas[i].suiteName = iInput.suiteName;
                  datas[i].release = jInput.release;

                  datas[i].buildNumber = kInput.buildNumber;
                  datas[i].suiteStatus = kInput.suiteStatus;
                  datas[i].totalTestcase = kInput.totalTestcase;
                  datas[i].totalTestcaseExecuted = kInput.totalTestcaseExecuted;
                  datas[i].totalPass = kInput.totalPass;
                  datas[i].totalFail = kInput.totalFail;
                  datas[i].executionDate = kInput.executionDate;
                  datas[i].bugDetail = kInput.bugDetail;
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
        const summaryTable = (this.state.releaseSummary.length > 0 ) ?(<div style={{marginTop: 50}}><div style={{marginTop: 20}}> <SummaryTable releaseSummary = {this.state.releaseSummary}/></div></div>):(<div></div>);
        const pieChart =(this.state.totalPass !== 0)? <TrendChart/>:<div></div>;
        
        return (
            <div>
             <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom" style={{margin:20}}>
            <h1 className="h2" >Red CI Trend Chart</h1>
            
          </div>
                <div style={{marginLeft:60,marginBottom:50}}>
                    <TrendChart data ={this.state.trendChartData}/>
                 </div>
                 
                 <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-top">
            <h1 className="h2" style={{marginTop: 50}}>Red Execution Result Summary</h1>
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