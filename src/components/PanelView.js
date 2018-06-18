import React, { Component ,ReactText} from 'react';
import { Collapse, Button, CardBody, Card, CardHeader} from 'reactstrap';

class PanelView extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false , validatons : ""};
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
    console.log(this.state.collapse);
    
  }
  componentDidMount(){
    console.log(this.props.testcase);
  }

// getMessage(){
  
//   return this.props.testcase.ValidationPointResults.forEach(element => {
//    <p>{element}</CardBody>
//   });
 


  

  render() {
    // let message =this.props.testcase.ValidationPointResults.forEach(element => {
    //  {element} 
    //  });
    let failureReason = (this.props.testcase.FailureReason) ?(/\d/.test(this.props.testcase.FailureReason) ? <div>Reason: <a href={"https://jira.logrhythm.com/browse/"+this.props.testcase.FailureReason}>{this.props.testcase.FailureReason}</a> </div>:<div>Reason: {this.props.testcase.FailureReason} </div> ) :<div/>;
    let validations = (this.props.testcase.ValidationPointResults) ? this.props.testcase.ValidationPointResults.join("\n") : (this.props.testcase.validationPointResults)? this.props.testcase.validationPointResults.join("\n") :'';
    let testcasename = (this.props.testcase.TestCaseName) ?this.props.testcase.TestCaseName :  (this.props.testcase.testCaseName) ?this.props.testcase.testCaseName :'';
    return (
      
      <div>
        <Card>
        <CardHeader color="primary" onClick={this.toggle}>{testcasename}</CardHeader>
        <Collapse isOpen={this.state.collapse}>
          
        <CardBody><pre>{validations}</pre>{failureReason}</CardBody>
         
        </Collapse>
        </Card>
      </div>
    );
  }
}

export default PanelView;
