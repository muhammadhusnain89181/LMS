import React, { Component,useEffect } from "react";
import Chart from "react-apexcharts";

function BarChart({title,X,Y}) {
    const read=()=>{
        console.log(`Y-0 ${Y[0]} Y-1 : ${Y[1]}`);
        X.map((i)=>{console.log(`BarChart :  X : ${X.length} :  Y : ${Y.length}`);})       
    }
    const chart={
        options: {
            chart: {
              id: "basic-bar"
            },
            xaxis: {
                categories:X
            //   categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
            }
          },
          series: [
            {
              name:title,
              data:Y
            //   data: [30, 40, 45, 50, 49, 60, 70, 91]
            }
          ]
        };
        
        useEffect(() => {
            read();
        }, [title,X,Y])
        
        
    return (
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={chart.options}
              series={chart.series}
              type="bar"
              width="500"
            />
          </div>
        </div>
    )
}

export default BarChart
