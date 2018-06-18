import React, {Component} from 'react';
import 'react-select/dist/react-select.css';
import Select from 'react-select';
import axios from 'axios';
import { set } from 'mongoose';

class Dropdown extends Component{
    constructor(props){
        super(props);
        this.state = {releaseArray:[],tempRelease:[],masterRelease:[],selectedOption:'',summaryDetails:[],defaultRelease:''};
        this.handleChange = this.handleChange.bind(this);
        this.convertToInput = this.convertToInput.bind(this);
        //this.extractRelease = this.extractRelease.bind(this);
        this.GetReleaseList = this.GetReleaseList.bind(this);
        this.getReleaseFromMasterDB = this.getReleaseFromMasterDB.bind(this);
        this.getReleaseFromTempDB = this.getReleaseFromTempDB.bind(this);
       
        
    }
    handleChange = (selected) => {
        this.setState({ selectedOption:selected });
        this.props.onReleaseChange(selected);
      }
   
    convertToInput = (inputString) =>{
        var inputObject = [];
        inputString.forEach(element => {
            inputObject.push({value:element,label:element})
        });
        return inputObject;
    }

    componentWillMount(){
        this.getReleaseFromMasterDB();
        this.getReleaseFromTempDB();
    }
   
    GetReleaseList (){
        let inputObject = [];
        let releaseReg = /[0-9].[0-9].[0-9]$/;
        console.log("in release list");
        //console.log(this.state.masterRelease);
        this.state.masterRelease.forEach(element => {
            if(element.Details)
            {
                element.Details.forEach(detail => {
                    if(detail.Release){
                    if(detail.Release.match(releaseReg))
                    inputObject.push(detail.Release);
                    }
                })
            }
        });
        this.state.tempRelease.forEach(element => {
         //   console.log(element);
            if(element.Details)
            {
                element.Details.forEach(detail => {
                   // console.log(detail.Release);
                    if(detail.Release.match(releaseReg))
                    inputObject.push(detail.Release);
                })
            }
        });
        let releaseList = new Set(inputObject);
      //  console.log(releaseList);
        let defaultSelect = releaseList.values().next().value;
        this.setState({releaseArray: releaseList,defaultRelease:defaultSelect});
        this.handleChange(defaultSelect);
        
    }

    getReleaseFromMasterDB(){
        axios.get('http://10.4.1.89:4200/result/release')
        .then(res =>{
            //console.log("Response from dropdown page from master db");
           // console.log(res.data);
            this.setState({masterRelease:res.data});
            this.GetReleaseList();        
        })
        .catch(function (error){
            console.log(error);
        })
        return true;
    }

    getReleaseFromTempDB(){
        axios.get('http://10.4.1.89:4200/result/tempresults/release')
        .then(res =>{
           // console.log("Response from dropdown page from temp db");
            //console.log(res.data);
            //let release = this.extractRelease(res);  
            this.setState({tempRelease:res.data});  
            console.log("in the end");
            this.GetReleaseList();        
            // if(this.state.releaseArray.length > 0)
            // {
            //     let releaseSet = this.state.releaseArray;
            //     for (let index = 0; index < release.length; index++) {
            //         releaseSet.push(release[index]);
            //     }
            //     this.setState({releaseArray:new Set(releaseSet)});
            // }
            // else
            // {
            //     this.setState({releaseArray:release}); 
            // }

            // let defaultSelect = this.state.releaseArray.values().next().value;
            // this.setState({releaseArray:release,defaultRelease:defaultSelect});
            // this.handleChange(defaultSelect);
        })
        .catch(function (error){
            console.log(error);
        })
        
        return true;
    }
    

  
    componentDidMount(){
       
        this.GetReleaseList();
        
        
        
    }
    
    render() {
    return(
                <div >
                <Select
                className="shadow "
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