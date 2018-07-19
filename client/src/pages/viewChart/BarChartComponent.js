import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';

export default class BarChartComponent extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3]
        }],
    },
    loading: true
  }
}
componentWillReceiveProps() {
  console.log(this.props.transactions, ' transactions data')
  if(this.props.transactions) this.setState({loading: false})
  return

}

    static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right',
    location:'City'
  }

  render(){
    if(this.state.loading) {
      return (<div></div>)
    }
    return (
      <div className="chart">
        <Bar
          data={this.props.transactions}
          options={{
            title:{
              display:"Total Balance Sheet",
              text: "Total Balance Sheet",
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        />
      </div>)
      }
  }