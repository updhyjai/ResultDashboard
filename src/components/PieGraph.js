
import React,{Component} from 'react';
// /var {React, Component} = require('react');
var  {PieChart,Pie,Legend,Tooltip,Cell} = require('Recharts');
//import {PieChart,Pie,Legend,Tooltip} from 'Recharts';

class PieGraph extends Component{
    constructor(props){
        super(props);
        this.state = {innerChartData : this.props.innerData,outerChartData:this.props.outerData};
        
    }
    INNERCOLOR = ['#006699', '#6666ff'];
    OUTERCOLOR = ['#4d89ff', '#004080'];
   

    renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
      var RADIAN = Math.PI / 180; 
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
     const x  = cx + radius * Math.cos(-midAngle * RADIAN);
     const y = cy  + radius * Math.sin(-midAngle * RADIAN);
    
     return (
       <text x={x} y={y} fill="white" textAnchor ={x > cx ? 'start' : 'end'} fontSize ={12} 	dominantBaseline="central">
         {`${(percent * 100).toFixed(0)}%`}
       </text>
     );
   };
    render() {
        return (
          <div >
              <PieChart  width={800} height={400}>
              <Pie data={this.props.outerData} cx={400} cy={200} innerRadius={60} outerRadius={130} labelLine={false}
          label={this.renderCustomizedLabel} datakey 
          fill="#8884d8">
          {
          	this.state.outerChartData.map((entry, index) => <Cell fill={this.OUTERCOLOR[index % this.OUTERCOLOR.length]}/>)
          }
        	</Pie>
          <Pie data={this.props.innerData} cx={400} cy={200}  outerRadius={50} labelLine={false}
          label={this.renderCustomizedLabel} datakey
          fill="#8884c8">
          {
            
          	this.state.innerChartData.map((entry, index) => <Cell fill={this.INNERCOLOR[index % this.INNERCOLOR.length]}/>)
          }
          
        	</Pie>
          <Legend layout = "vertical" verticalAlign = "middle" align="right" />
              <Tooltip/>
                    
                    
            </PieChart>
          </div>
        );
      }

}

export default PieGraph;