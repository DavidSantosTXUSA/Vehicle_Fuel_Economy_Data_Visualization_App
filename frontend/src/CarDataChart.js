// CarDataChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function CarDataChart({ data }) {
  const chartData = {
    labels: data.map((item) => `${item.car_model} ${item.year}`),
    datasets: [
      {
        label: 'Combined FE',
        data: data.map((item) => item.comb_fe),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      // You can add more datasets here
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Combined Fuel Economy by Car Model',
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}

export default CarDataChart;

