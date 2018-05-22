import React, { Component } from 'react';
import ModalView from './ModalView';

class SummaryTableRow extends Component {
  render() {
    return (
        <tr>
          <td>
            {this.props.obj.testPlanName}            
          </td>
          <td>
            {this.props.obj.release}            
          </td>
          <td>
            {this.props.obj.buildNumber}
          </td>
          <td>
            {this.props.obj.suiteStatus}
          </td>
          <td>
            {this.props.obj.totalTestcase}
          </td>
          <td>
            {this.props.obj.totalTestcaseExecuted}
          </td>
          <td>
            {this.props.obj.totalPass}
          </td>
          <td>
            {this.props.obj.totalFail}
          </td>
          <td>
            {this.props.obj.totalBugFailure}
          </td>
          <td>
            {this.props.obj.executionDate}
          </td>
          <td>
            {this.props.obj.bugDetail}
          </td>
          <td>
          
           <ModalView obj = {this.props.obj}/>
          
          </td>
        </tr>
    );
  }
}

export default SummaryTableRow;