import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export const CreditChart = ({lst}) => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    datasets: [
      {
        label: "Credit",
        data: lst,
        backgroundColor:["rgba(39, 245, 169, 0.8)"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
            <div className="w-[500px] bg-slate-100 p-2 rounded shadow-lg">
                <Bar data={data} options={options} />
            </div>
        )
    
};

