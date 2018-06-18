import React, { Component } from 'react';
import SummaryTable from '../components/SummaryTable';
import Dropdown from '../components/Dropdown';
import Chart from '../components/PieGraph';
import axios from 'axios';
import Carousel from '../components/Carousel';
import UnverifiedResultTable from '../components/ResultTable';
import { Container, Row, Col, Badge, TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, CardHeader } from 'reactstrap';
import classnames from 'classnames';
import PassPieGraph from '../components/PassCoveragePie';
import TestPieGraph from '../components/TestCoveragePie';
import TestCoveragePie from '../components/TestCoveragePie';
import Table from '../components/Table';


export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            release: '',
            releaseSummary: [],
            totalPass: 0,
            totalFail: 0,
            totalTestcase: 0,
            totalTestcaseExecuted: 0,
            releaseSummaryUnverified: [],
            activeTab: '1',
        };
        this.onReleaseChange = this.onReleaseChange.bind(this);
        this.getReleaseSummary = this.getReleaseSummary.bind(this);
        this.getUnverifiedSummary = this.getUnverifiedSummary.bind(this);
        this.toggle = this.toggle.bind(this);
    }
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({ activeTab: tab });
        }
    }
    getUnverifiedSummary = (val) => {
        axios.get('http://10.4.1.89:4200/result/tempresults/regression/release/' + val)
            .then(response => {
               // console.log("Response data from tempdb ci below with version: " + val);
               // console.log(response.data);
                var datas = new Array(response.data.length);
                var input = response.data;
                var tFail = 0, tPass = 0, tTc = 0, tETc = 0;
                if (input.length > 0) {
                    for (var i = 0; i < input.length; i++) {
                        datas[i] = [];
                        var iInput = input[i];
                       // console.log(iInput.TestPlanName);
                        datas[i]._id = iInput._id;
                        datas[i].testPlanName = iInput.TestPlanName;
                        for (var j = 0; j < iInput.Details.length; j++) {
                            var jInput = iInput.Details[j];
                            datas[i].release = jInput.Release;
                            for (var k = 0; k < jInput.Results.length; k++) {
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
                                tTc += kInput.TotalTestcase;
                                tETc += kInput.TotalTestcaseExecuted;
                            }
                        }
                    }
                }
                this.setState({ releaseSummaryUnverified: datas })
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    onReleaseChange = (val) => {
        console.log(val);
        this.setState({ release: val });
        this.getReleaseSummary(val);
        this.getUnverifiedSummary(val);

    }

    getReleaseSummary = (val) => {
        axios.get('http://10.4.1.89:4200/result/regression/release/' + val)
            .then(response => {
               // console.log("In table get" + val);
               // console.log(response.data);
                var datas = new Array(response.data.length);
                var input = response.data;
                var tFail = 0, tPass = 0, tTc = 0, tETc = 0;
                if (input.length > 0) {
                    let z = 0;
                    for (var i = 0; i < input.length; i++) {
                        datas[i + z] = [];
                        var iInput = input[i];
                        //datas[i+z].testPlanName = iInput.testPlanName;
                        for (var j = 0; j < iInput.Details.length; j++) {
                            var jInput = iInput.Details[j];
                            if (jInput.Release != val)
                                continue;
                            //datas[i+z].release = jInput.release;

                            for (let k = 0; k < jInput.Results.length; k++) {
                                let kInput = jInput.Results[k];
                                z = k;
                                datas[i + z] = [];
                                datas[i + z].testPlanName = iInput.TestPlanName;
                                datas[i + z].release = jInput.Release;
                                datas[i + z].totalBugFailure = kInput.TotalBugFailure;
                                datas[i + z].buildNumber = kInput.BuildNumber;
                                datas[i + z].suiteStatus = kInput.SuiteStatus;
                                datas[i + z].totalTestcase = kInput.TotalTestcase;
                                datas[i + z].totalTestcaseExecuted = kInput.TotalTestcaseExecuted;
                                datas[i + z].totalPass = kInput.TotalPass;
                                datas[i + z].totalFail = kInput.TotalFail;
                                datas[i + z].executionDate = kInput.ExecutionDate;
                                datas[i + z].bugDetail = kInput.BugDetail;
                                datas[i + z].failedTestCase = kInput.FailedTestCase;
                                datas[i + z].remarks = kInput.AdditionalInfo;
                                datas[i + z].buildCombination = kInput.BuildCombination;
                                tFail += kInput.TotalFail;
                                tPass += kInput.TotalPass;
                                tTc += kInput.TotalTestcase;
                                tETc += kInput.TotalTestcaseExecuted;

                            }

                        }
                    }
                }
                this.setState({ releaseSummary: datas, totalFail: tFail, totalPass: tPass, totalTestcase: tTc, totalTestcaseExecuted: tETc })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {

        const executionCoverage = [{ name: 'Total TC Executed', value: this.state.totalTestcaseExecuted }, { name: 'Total TC Not Executed ', value: 0}];
        const unverifiedResultTable = (this.state.releaseSummaryUnverified.length > 0) ? (<div style={{ marginTop: 50 }}><div style={{ marginTop: 20 }}> <UnverifiedResultTable releaseSummary={this.state.releaseSummaryUnverified} /></div></div>) : (<div><h1>No new results now!</h1></div>);
        const verifiedResult = (this.state.releaseSummary.length > 0) ? (<Table TableData={this.state.releaseSummary} />) : (<div></div>);

        const PassPieChart = ((this.state.totalPass !== 0)) ? <PassPieGraph chartData={[{ name: 'Pass', value: this.state.totalPass }, { name: 'Fail', value: this.state.totalFail }]} /> : <div />;
        const TestPieChart = ((this.state.totalPass !== 0)) ? <TestPieGraph chartData={executionCoverage} /> : <div />;
        const percent = Math.round(this.state.totalTestcaseExecuted * 100 / this.state.totalTestcase);
        const percentPass = Math.round(this.state.totalPass * 100 / this.state.totalTestcaseExecuted);

        return (

            <div>

                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 sm-3  border-bottom" style={{ margin: 20 }}>
                    <h1 className="h2 shadow-sm font-weight-light">Execution Summary for {this.state.release} Release</h1>
                    <div className="form-control-lg mb-4 mb-md-0">
                        <h3 >Release</h3>
                        <Dropdown onReleaseChange={this.onReleaseChange} />

                    </div>
                </div>
                <div className="container-fluid">
                <div className="row">
                    <div align="center" className="col-sm-2 col-md-2 col-lg-2  bg-dark shadow-sm">
                        <div className="row">
                            <div align="center" className="col-sm-12 bg-dark" >
                                <Card body inverse color="info" className="shadow border border-info rounded" style={{ marginTop: 50 }}>
                                    <CardTitle className="shadow-sm font-weight-light">Total Test-case Pass</CardTitle>
                                    <CardTitle><h1 className="font-weight-light">{this.state.totalPass}</h1></CardTitle>
                                </Card>
                            </div>
                        </div>
                        <div className="row">
                            <div align="center" className="col-sm-12  bg-dark" style={{ margintop: 20 }}>
                                <Card body inverse color="info" className="shadow border border-info rounded" style={{ marginTop: 70}}>
                                    <CardTitle className="shadow-sm font-weight-light">Total Test-case Fail</CardTitle>
                                    <CardTitle><h1 className="font-weight-light">{this.state.totalFail}</h1></CardTitle>
                                </Card>
                            </div>
                        </div>
                    </div>


                    <div className="col-md-4 col-lg-4 bg-dark shadow-lg">
                        {PassPieChart}
                    </div>
                    <div className="col-md-4 col-lg-4 bg-dark shadow-lg">
                        {TestPieChart}
                    </div>

                    <div className="col-sm-2 col-md-2 col-lg-2 bg-dark shadow-sm">
                        <div className="row">
                                <div align="center" className="col-sm-12 bg-dark " style={{ margintop: 40 }} >
                                    <Card body inverse color="primary" className="shadow border border-primary rounded" style={{ marginTop: 50 }}>
                                        <CardTitle className="shadow-sm font-weight-light">Total Test-case</CardTitle>
                                        <CardTitle><h1 className="font-weight-light">{this.state.totalTestcaseExecuted}</h1></CardTitle>
                                    </Card>
                                </div>
                            </div>
                            <div className="row">
                                <div align="center" className="col-sm-12 bg-dark" >
                                    <Card body inverse color="primary" className="shadow border border-info rounded" style={{ marginTop: 70 }}>
                                        <CardTitle className="shadow-sm font-weight-light">Total Test-case Executed</CardTitle>
                                        <CardTitle><h1 className="font-weight-light">{this.state.totalTestcaseExecuted}</h1></CardTitle>
                                    </Card>
                                </div>
                            </div>


                        </div>
                    </div>
                    </div>

               
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom " style={{ marginTop: 50 }}>

                    <h1 className="h1 font-weight-light">Summary Table</h1>

                </div>

                <div>
                    <Nav tabs>
                    
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
                                    {verifiedResult}
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