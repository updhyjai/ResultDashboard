import React, {Component} from 'react';
import 'react-select/dist/react-select.css';
import Select from 'react-select';
import axios from 'axios';

class Dropdown extends Component{
    constructor(props){
        super(props);
        this.state = {releaseArray:[],selectedOption:'',summaryDetails:[],defaultRelease:''};
        this.handleChange = this.handleChange.bind(this);
        this.convertToInput = this.convertToInput.bind(this);
        this.extractRelease = this.extractRelease.bind(this);
    }
    handleChange = (selected) => {
        this.setState({ selectedOption:selected }, () => {
            console.log(this.state.selectedOption); // This is guaranteed to return the updated state. 
        });
        console.log(this.state.selectedOption);
        this.props.onReleaseChange(selected);
        


      }
   

    convertToInput = (inputString) =>{
        var inputObject = [];
        inputString.forEach(element => { inputObject.push({value:element,label:element})
          
        });
        return inputObject;
    }
    
    
    extractRelease = (inputString) =>{
        var inputObject = [];
        inputString.data.forEach(element => {
            element.details.forEach(detail => {
                inputObject.push(detail.release);
            })
        });
        return new Set(inputObject);
    }
    componentDidMount(){
        axios.get('http://10.4.1.89:4200/result/release')
        .then(res =>{
            //console.log( "Response"+res.data[0].details[0].release);
            let release = this.extractRelease(res);
            let defaultSelect = release.values().next().value;
            this.setState({releaseArray:release,summaryDetails:res.data,defaultRelease:defaultSelect});
            this.handleChange(defaultSelect);
            console.log(release.values().next().value);
            
          
            
        })
        .catch(function (error){
            console.log(error);
        })


    }
    
    render() {
    return(
                <div>
                <Select
                
                name="form-field-name"
                value={this.state.selectedOption}
                onChange={this.handleChange}
                options={ this.convertToInput(this.state.releaseArray)} 
                selectedValue ={this.state.defaultRelease}
                simpleValue
                deleteRemoves={false}
                clearable={false}
              />
              
            </div>
            );
            
            }
}
export default Dropdown;