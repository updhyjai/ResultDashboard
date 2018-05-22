import React, { Component } from 'react';
//import axios from 'axios';
import SummaryTableRow from './SummaryTableRow';
import axios from 'axios';
export default class SummaryTable extends Component {

  constructor(props) {
      super(props);
      this.state = {executionSummary: this.props.releaseSummary,release:''};
      this.tabRow = this.tabRow.bind(this);
      console.log('in table');
      console.log(this.props.releaseSummary);
      //this.updatedSummary = this.updatedSummary.bind(this);
    
    }

   

    componentDidMount(){
      
      console.log('in table');
      console.log(this.props.releaseSummary);
     
      
    }

    
    tabRow(){
      console.log(this.props.releaseSummary);
      return this.props.releaseSummary.map(function(object, i){
        return <SummaryTableRow obj={object} key={i} />;
    }); 
  }
  

    render() {
      return (
        <div className="table-responsive"  style={{marginTop: 20}}>
            <table className="table table-sm ">
              <thead className="thead-dark">
                <tr>
                  <th>Suite Name</th>
                  <th>Release</th>
                  <th>Build Number</th>
                  <th>Status</th>
                  <th>Total Test-case</th>
                  <th>Total Test-case Executed</th>
                  <th>Total Pass</th>
                  <th>Total Fail</th>
                  <th>Total Failed Due to Bug</th>
                  <th>Execution Date</th>
                  <th>Bug Details (If any)</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.tabRow()}
              </tbody>
            </table>
        </div>
      );
    }
  }