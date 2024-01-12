import {
  Chart,
  DoughnutController,
  CategoryScale,
  LinearScale,
  Title,
} from "chart.js";
import {} from "chart.js";
import { useRef, useEffect } from "react";

const DoughnutChart = () => {
  // const ChartRef = useRef<HTMLCanvasElement | null>(null);
  // const ChartInstance = useRef<Chart<DoughnutController, unknown> | null>(null);

  // useEffect(() => {
  //   if (ChartInstance.current) {
  //     ChartInstance.current.destroy();
  //   }
  //   const myCharRef = ChartRef.current?.getContext("2d");
  //   if (myCharRef) {
  //     ChartInstance.current = new Chart(myCharRef, {
  //       type: "doughnut",
  //       data: {
  //         labels: ["Delay", "Taxes", "Pensions", "Salary"],
  //         datasets: [
  //           {
  //             data: [30, 15, 15, 60],
  //             backgroundColor: [
  //               "rgb(225,99, 132)",
  //               "rgb(54,162,235)",
  //               "rgb(255,205,86)",
  //               "rgb(204, 51, 255)",
  //             ],
  //           },
  //         ],
  //       },
  //       options: {
  //         plugins: {
  //           title: {
  //             display: true,
  //             text: "Payroll Distribution",
  //           },
  //         },
  //       },
  //     });
  //   }
  //   return () => {
  //     if (ChartInstance.current) {
  //       ChartInstance.current.destroy();
  //     }
  //   };
  // }, []);

  // return (
  //   <div>
  //     <h2 className="py-4">Payroll Distribution</h2>
  //     <canvas ref={ChartRef} style={{ width: "300px", height: "200px" }} />
  //   </div>
  // );
};

export default DoughnutChart;
