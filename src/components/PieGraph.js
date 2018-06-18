
import React,{Component} from 'react';
// /var {React, Component} = require('react');
var  {PieChart,Pie,Legend,Tooltip,Cell, ResponsiveContainer,LabelList} = require('Recharts');
//import {PieChart,Pie,Legend,Tooltip} from 'Recharts';

class PieGraph extends Component{
    constructor(props){
        super(props);
        this.state = {innerChartData : this.props.innerData,outerChartData:this.props.outerData};
        this.renderCustomizedLabel = this.renderCustomizedLabel.bind(this);
        
    }
    
   

    renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
      let RADIAN = Math.PI / 180; 
      let radius = innerRadius + (outerRadius - innerRadius) * 0.5;
     let x  = cx + radius * Math.cos(-midAngle * RADIAN);
     let  y = cy  + radius * Math.sin(-midAngle * RADIAN);
    
     return (
       <text x={x} y={y} fill="white" textAnchor ={x > cx ? 'start' : 'end'} fontSize ={12} 	>
         {`${(percent * 100).toFixed(0)}%`}
       </text>
     );
   };
    render() {
      const OUTERCOLOR = ['#28a745', '#dc3545'];
    const INNERCOLOR = ['#17a2b8', '#616366'];
        return (
          <div >
            <ResponsiveContainer width={800} height={450}>
              <PieChart  width={800} height={450}  >
              <Pie data={this.props.outerData} cx={400} cy={200} innerRadius={120} outerRadius={160} 
            paddingAngle={3}  fill="#343a40" label = {this.renderCustomizedLabel}
          >
          {
          	this.state.outerChartData.map((entry, index) => <Cell strokeWidth={4} stroke = {OUTERCOLOR[index % OUTERCOLOR.length]} stroke={OUTERCOLOR[index % OUTERCOLOR.length]}/>)
          }
         
        	</Pie>
              <Tooltip/>
                    
                    
            </PieChart>
            </ResponsiveContainer>
          </div>

        );
      }

}

export default PieGraph;