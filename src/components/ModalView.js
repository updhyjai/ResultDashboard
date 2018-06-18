/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem, ListGroupItemHeading } from 'reactstrap';
import PanelView from './PanelView';


class ModalView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }


getPanel(){
 // console.log(this.props.releaseSummary);
 if(this.props.obj.failedTestCase){
  return this.props.obj.failedTestCase.map(function(object, i){
    return <PanelView testcase={object} key={i} />;
}); 
 }
 return null;
}
  

  render() {
   // const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={this.toggle}>&times;</button>;


   const info = (this.props.obj && this.props.obj.remarks) ? <ListGroupItem>
   <ListGroupItemHeading>
     Additional Information
     </ListGroupItemHeading>
     {this.props.obj.remarks}
   </ListGroupItem>
  : <div/>;

  const bugDetail = (this.props.obj && this.props.obj.bugDetail) ? <ListGroupItem>
   <ListGroupItemHeading>
     Bug Details
     </ListGroupItemHeading>
     {this.props.obj.bugDetail}
   </ListGroupItem>
  : <div/>;

  const bugFailure = (this.props.obj &&  this.props.obj.totalBugFailure) ? <ListGroupItem>
   <ListGroupItemHeading>
     Testcases failed due to Bug
     </ListGroupItemHeading>
     {this.props.obj.totalBugFailure}
   </ListGroupItem>
  : <div/>;
    return (
      <div>
        <Button className="btn-info"  onClick={this.toggle}> View </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} size = "lg" >
          <ModalHeader toggle={this.toggle}>{this.props.obj.testPlanName}</ModalHeader>
          <ModalBody>
            
            <ListGroup>
             
              <ListGroupItem>
                <ListGroupItemHeading>
                  Suite Name
                  </ListGroupItemHeading>
                  {this.props.obj.testPlanName}
                </ListGroupItem>
                {info}
                <ListGroupItem>
                <ListGroupItemHeading>
                  Build Number
                  </ListGroupItemHeading>
                  {this.props.obj.release}.{this.props.obj.buildNumber}
                </ListGroupItem>
                <ListGroupItem>
                <ListGroupItemHeading>
                  Product Build Number
                  </ListGroupItemHeading>
                  {this.props.obj.buildCombination}
                </ListGroupItem>
                <ListGroupItem>
                <ListGroupItemHeading>
                  Execution Date
                  </ListGroupItemHeading>
                  {this.props.obj.executionDate}
                </ListGroupItem>
                <ListGroupItem>
                <ListGroupItemHeading>
                  Total Number of Test-cases
                  </ListGroupItemHeading>
                  {this.props.obj.totalTestcase}
                </ListGroupItem>
                <ListGroupItem>
                <ListGroupItemHeading>
                  Total Test-cases Executed
                  </ListGroupItemHeading>
                  {this.props.obj.totalTestcaseExecuted}
                </ListGroupItem>
                <ListGroupItem>
                <ListGroupItemHeading>
                  Total Test-cases Pass
                  </ListGroupItemHeading>
                  {this.props.obj.totalPass}
                </ListGroupItem>
                <ListGroupItem>
                <ListGroupItemHeading>
                  Total Test-cases Fail
                  </ListGroupItemHeading>
                  {this.props.obj.totalFail}
                </ListGroupItem>
                {bugFailure}
                {bugDetail}
                <ListGroupItem>
                <ListGroupItemHeading>
                  Failures
                  </ListGroupItemHeading>
                  {this.getPanel()}
                 
                 
                </ListGroupItem>
                
              </ListGroup>

            
           
            
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalView;
