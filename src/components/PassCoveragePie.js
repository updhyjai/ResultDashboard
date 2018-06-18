import React,{Component} from 'react';
// /var {React, Component} = require('react');
var  {PieChart,Pie,Legend,Tooltip,Cell, ResponsiveContainer,LabelList,Sector, ResponsiveContainer} = require('Recharts');



export default class PassCoveragePie extends Component{
 constructor(props){
     super(props);
     this.state = {activeIndex :0};
     this.renderActiveShape = this.renderActiveShape.bind(this);
     this.onPieEnter = this.onPieEnter.bind(this);
    
 }

 
                   
 renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fontSize={25} fill={fill}>{payload.name}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill="#17a2b8"
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill="#17a2b8"
      />
     
      
      <text  x={cx} y={cy} dy={30} textAnchor="middle" fontSize={16}  fill="#999"> {`${(percent * 100).toFixed(2)}%`}</text>
     
       
      
    </g>
  );
};
onPieEnter(data, index) {
    this.setState({
      activeIndex: index,
    });
}

    getInitialState() {
        return {
          activeIndex: 0,
        };
    }

 
  
	render () {
        
  	return (
          <ResponsiveContainer >
    	<PieChart >
        <Pie 
        
        	activeIndex={this.state.activeIndex}
          activeShape={this.renderActiveShape} 
          data={this.props.chartData} 
          cx={240} 
          cy={210} 
          innerRadius={100}
          outerRadius={150} 
          fill="#6c757d"
          stroke="none"
          onMouseLeave = {this.onPieEnter}
          onMouseEnter={this.onPieEnter}
          
        />
       </PieChart>
       </ResponsiveContainer>
    );
  }
}
