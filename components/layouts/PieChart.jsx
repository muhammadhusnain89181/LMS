import React,{Component} from 'react'
import ReactApexChart from 'react-apexcharts'
class ApexChart extends Component {
    constructor(props) {
      super(props);
      const {Course,percentage,title1,title2}=this.props;
      const otherper=100-percentage;

      this.state = {
      
        series: [Math.round(percentage), otherper],
        options: {
          chart: {
            width: 270,
            type: 'pie',
          },
          // title: {
          //   text: 'Gradient Donut with custom Start-angle'
          // },
          labels: [title1, title2],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        }, 
      };
    }
    render() {
      return (
        <div id="chart">
          <ReactApexChart options={this.state.options} series={this.state.series} type="pie" width={300} />
        </div>
      );
    }
  }

  export default ApexChart