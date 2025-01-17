import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register the required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export const CreditPieChart = ({lst}) => {
  const data = {
    labels: ["Food", "Rent", "Travel", "Cloth", "Other"],
    datasets: [
      {
        label: "Votes",
        data: lst,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top", // 'top', 'bottom', 'left', 'right'
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="w-[500px] bg-slate-100 p-4 rounded shadow-lg flex flex-col items-center">
        <h1 className="text-lg text-slate-500">Credit Distribution</h1>
        <Pie data={data} options={options} className="p-4" />
    </div>
  );
};
