import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useSelector } from "react-redux";

export default function Barchart() {
  const { income } = useSelector((state) => {
    return state.auth.seller;
  });

  const date = new Date();
  const month = date.getMonth();

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const data = {
    labels: labels.slice((month - 5) % 12, month + 1),
    datasets: [
      {
        label: "Earning",
        data: income.slice((month - 5) % 12, month + 1),
        // data:[20,30,60,100,10,80],
        backgroundColor: "rgba(221, 0, 174, 0.5)",
      },
    ],
  };

  return (
    <div className="w-[90%] lg:w-[60%] mb-4 mx-auto mt-8">
      <Bar options={options} data={data} />
    </div>
  );
}
