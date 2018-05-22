import  {LineChart, Line, Legend,AreaChart, Area, Label,Brush, XAxis, YAxis, CartesianGrid, Tooltip}  from 'recharts';
import React, {Component} from 'react';
import LabelList from 'recharts/lib/component/LabelList';

class TrendChart extends Component{
    //

   constructor(props){
       super(props);
        this.state = {
            
            LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip,Legend,Label,
            style : 
            {
                top: 0,
                left: 350,
                lineHeight: '24px'
            }
        }
    }
    
    render (){
        return (
    /*    <BarChart width={800} height={500} data={this.state.trendChartData}
            margin={{top: 15, right: 30, left: 20, bottom: 15}}>
        <XAxis tick = {false} dataKey="Name" label = {{value : 'Suite Name' , position : 'bottom', offset : -15 }}/>
        <YAxis/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Legend />
        
        <Bar animationDuration = {2000} animationEasing = 'ease-out'  strokeWidth = '2' fillOpacity = {0.1} barSize={50} fill = "#ff1616"stroke='#ff1616' dataKey="Fail" stackId="a"  />
        <Bar animationDuration = {2000} animationEasing = 'ease-in' strokeWidth = '2' fillOpacity = {0.1} barSize={50} fill = "#71a1ed"stroke='#71a1ed' dataKey="Pass" stackId="a" >
        <LabelList dataKey="Name" position="center" angle={-90}  fill = "#4d5d8e" />
        </Bar>
        </BarChart>*/
        <div className="justify-content-md-center">
        <LineChart width={1200} height={450} data={this.props.data} syncId="anyId"
                margin={{top: 10, right: 30, left: 0, bottom: 10}}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Build" width = {5} ></XAxis>
            <YAxis label={{ value: '# of Test-cases', angle: -90, position: 'insideLeft' }}/>
            <Tooltip/>
            <Line type='monotone' dataKey='Pass' stroke='#8884d8' fill='#8884d8' strokeWidth ={2}/>
            <Line type='monotone' dataKey='Fail' stroke='red' fill='red' strokeWidth ={2}></Line>
            <Brush height={20}  margin= {10}/>
            <Legend verticalAlign="top" height={16}/>
            
        </LineChart>
        
      
        </div>
    );
    }
}
export default TrendChart