import React, { Component } from 'react';
import axios from 'axios';
import TrendChart from '../components/TrendChart';
import chartData from '../models/data.json';
import SummaryTable from '../components/SummaryTable';
import Dropdown from '../components/Dropdown';
import UnverifiedResultTable from '../components/ResultTable';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { validateWidthHeight } from 'Recharts/lib/util/ReactUtils';

export default class Smoke extends Component {
    constructor(props){
        super(props);
        this.state={
            releaseSummary:[],
            trendChartData :[],
            activeTab: '1',
            releaseSummaryUnverified:[]
        };

        this.getReleaseSummary = this.getReleaseSummary.bind(this);
        this.getUnverifiedSummary = this.getUnverifiedSummary.bind(this);
        this.getTrendChartDataFromDB = this.getTrendChartDataFromDB.bind(this);
        this.toggle = this.toggle.bind(this);
    
    }

    toggle(tab){
        if (this.state.activeTab !== tab) {
            this.setState({activeTab: tab});
        }
    }


    getTrendChartDataFromDB(val){
        axios.get('http://10.4.1.89:4200/result/ci/release/'+val+'/smoke/')
        .then(response=>{
            console.log("Response data for trend chart from masterDB below from smoke with release"+val);
            console.log(response.data);
            let count = response.data.length;
            if(count>0)
            {
                let array = response.data;
                let trendData = [];
                let z =0;
                for (let i = 0; i < array.length; i++) {
                    let iArray = array[i];
                    for (let j = 0; j < iArray.Details.length; j++) {
                        let jArray = iArray.Details[j];
                        for (let k = 0; k < jArray.Results.length; k++) {
                            let kArray = jArray.Results[k];
                            if(jArray.Release !== val)
                            continue;
                            trendData[z] = {};
                            trendData[z].Build = jArray.Release + '.' + kArray.BuildNumber;
                            trendData[z].Fail = kArray.TotalFail;
                            trendData[z].Pass = kArray.TotalPass;
                            trendData[z].Total = kArray.TotalTestcaseExecuted;
                            trendData[z].Date = kArray.ExecutionDate;
                            z++;
                        }
                    }
                }    
                this.setState({trendChartData:trendData});
            }
        })
        .catch(function(error){
            console.log(error);
        })
    }

    componentDidMount(){
        
    }
    
    onReleaseChange = (val)=> {        
        console.log(val);
        this.getTrendChartDataFromDB(val);
        this.getReleaseSummary(val);
        this.getUnverifiedSummary(val);
        
    }

    getReleaseSummary = (val)=>{
        axios.get('http://10.4.1.89:4200/result/release/'+ val + '/smoke')
        .then(response => {
        console.log("Response data for summary table from masterDB below from smoke with release "+ val);
        console.log(response.data);
        var datas = new Array(response.data.length);
        //var chartData = new Array(response.length);
        var input = response.data;
        var tFail =0,tPass=0,tTc = 0,tETc =0;
        if(input.length > 0){
            let z = 0;
        for(var i=0;i<input.length;i++){
            datas[i+z] = [];
            var iInput = input[i]; 
            
                for(let j=0;j<iInput.Details.length;j++){
                    let jInput = iInput.Details[j];
                    if(jInput.Release != val)
                            continue;
                            for(let k = 0;k<jInput.Results.length;k++){
                            let kInput = jInput.Results[k];
                            z = k;
                            datas[i+z] = [];
                            datas[i+z].testPlanName = iInput.TestPlanName;
                            datas[i+z].release = jInput.Release;
                            datas[i+z].totalBugFailure = kInput.TotalBugFailure;
                            datas[i+z].buildNumber = kInput.BuildNumber;
                            datas[i+z].suiteStatus = kInput.SuiteStatus;
                            datas[i+z].totalTestcase = kInput.TotalTestcase;
                            datas[i+z].totalTestcaseExecuted = kInput.TotalTestcaseExecuted;
                            datas[i+z].totalPass = kInput.TotalPass;
                            datas[i+z].totalFail = kInput.TotalFail;
                            datas[i+z].executionDate = kInput.ExecutionDate;
                            datas[i+z].bugDetail = kInput.BugDetail;
                            datas[i+z].failedTestCase = kInput.FailedTestCase;
                            datas[i+z].remarks = kInput.Remarks;
                            datas[i+z].buildCombination = kInput.BuildCombination;
                            tFail += kInput.TotalFail;
                            tPass += kInput.TotalPass;
                            tTc  += kInput.TotalTestcase;
                            tETc += kInput.TotalTestcaseExecuted;
                            }
                        }
                
                
                }
            }
            this.setState({releaseSummary:datas,totalFail:tFail,totalPass:tPass,totalTestcase:tTc,totalTestcaseExecuted:tETc})
        })
        .catch(function (error) {
        console.log(error);
        })
    }

    getUnverifiedSummary = (val)=>{
        axios.get('http://10.4.1.89:4200/result/tempresults/ci/release/'+ val + '/smoke')
        .then(response => {
            console.log("Response data from tempdb ci below with version: " + val);
            console.log(response.data);
            var datas = new Array(response.data.length);
            var input = response.data;
            var tFail =0,tPass=0,tTc = 0,tETc =0;
            if(input.length > 0){
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
                            datas[i].failedTestCase = kInput.FailedTestCase;
                            datas[i].passedTestCase = kInput.PassedTestCase;
                            datas[i].buildCombination = kInput.BuildCombination;
                            tFail += kInput.TotalFail;
                            tPass += kInput.TotalPass;
                            tTc  += kInput.TotalTestcase;
                            tETc += kInput.TotalTestcaseExecuted;
                        }
                    }
                }
            }
            this.setState({releaseSummaryUnverified:datas})
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    render() {
        const trendChart = (this.state.trendChartData.length>0)?(<TrendChart data ={this.state.trendChartData}/>) :<div />;
        const unverifiedResultTable = (this.state.releaseSummaryUnverified.length > 0 ) ?(<div style={{marginTop: 50}}><div style={{marginTop: 20}}> <UnverifiedResultTable releaseSummary = {this.state.releaseSummaryUnverified}/></div></div>):(<div><h1>No new results now!</h1></div>);
        const summaryTable = (this.state.releaseSummary.length > 0 ) ?(<div style={{marginTop: 50}}><div style={{marginTop: 20}}> <SummaryTable releaseSummary = {this.state.releaseSummary}/></div></div>):(<div></div>);
        const pieChart =(this.state.totalPass !== 0)? <TrendChart/>:<div></div>;
        
        return (
            <div>
             <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom" style={{margin:20}}>
            <h2 className="h2" >Smoke CI Trend Chart</h2>
            <div className="form-control-lg mb-4 mb-md-0">
            <h3>Release</h3>
              <Dropdown onReleaseChange = {this.onReleaseChange} />
            
          </div>
            
          </div>
                
                <Row>
              <Col sm="12">
              {trendChart}
              </Col>
            </Row>
                  
                
                 
                 <div style={{marginTop: 50}} className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
            <h1 className="h2" >Smoke Execution Result Summary</h1>
           
          </div>
          <div>
        <Nav tabs className="shadow">
        <NavItem className="summaryTab">
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Verified Results
            </NavLink>
          </NavItem>
          <NavItem className="summaryTab">
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Unverified Results
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
              {summaryTable}
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
              {unverifiedResultTable}
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
            
            
                
             
            
            </div>
        )
    }
}