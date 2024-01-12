import {Chart} from 'chart.js/auto'
import { useRef } from 'react';
import { useEffect } from 'react';

const LineChart = () => {
const ChartRef = useRef(null)
const ChartInstance = useRef(null);

useEffect(() => {
if(ChartInstance.current){
    ChartInstance.current.destroy()
}
const myCharRef = ChartRef.current.getContext('2d')
ChartInstance.current = new Chart(myCharRef, {
  type: "line",
  data: {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Line Chart",
        data: [65, 36, 67, 35, 65],
        fill: false,
        borderColor: "rgb(75,192, 192) ",
        borderWidth: 2,
      },
    ],
  },
});
return() => {
    if(ChartInstance.current){
        ChartInstance.current.destroy()
    }
}
}, [])


  return <div>
    <h2 className='py-4'>Payroll History</h2>
      <canvas ref={ChartRef} style={{width:'300px', height:'200px'}}/>
  </div> 
    

};
export default LineChart;
