import React, { Component } from 'react';
import { NavLink} from 'react-router-dom';
import Popup from 'reactjs-popup';
import ModalView from './ModalView';

class ResultTabRow extends Component {
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
            {this.props.obj.totalTestcaseExecuted}
          </td>
          <td>
            {this.props.obj.totalPass}
          </td>
          <td>
            {this.props.obj.totalFail}
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
          <td>
          <NavLink to = {"/edit/"+this.props.obj._id}  className="btn btn-primary">Verify</NavLink>
          </td>
        </tr>
    );
  }
}

export default ResultTabRow;