import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';
import axios from 'axios';

export default class BarChartComponent extends Component
{
   constructor(props) {
      super(props);
      this.state = {
        Data: {}
      }
    }
       
      componentDidMount() {
        axios.get(`http://localhost:3000/api/charts`)
          .then(res => {
            const accountChart = res.data;
            let dataType = [];
            let dataValue = [];
            accountChart.forEach(element => {
                dataType.push(element.name);
                dataValue.push(element.score);
            });
            this.setState({ 
              Data: {
                labels: dataType,
                datasets:[
                   {
                      label:dataType,
                      data: dataValue ,
                      backgroundColor:[
                       'rgba(255,105,145,0.6)',
                       'rgba(155,100,210,0.6)',
                       'rgba(90,178,255,0.6)',
                       'rgba(240,134,67,0.6)',
                       'rgba(120,120,120,0.6)',
                       'rgba(250,55,197,0.6)'
                    ]
                   }
                ]
             }
             });
          })
      }
 render()
   {
      return(
        <div>
          <Bar
            data = {this.state.Data}
            options = {{ maintainAspectRatio: false }} />
        </div>
      )
   }
}