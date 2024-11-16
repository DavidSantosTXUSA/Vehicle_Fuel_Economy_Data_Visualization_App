// src/FuelEconomyChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';

// Import required chart components from chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the components with ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function FuelEconomyChart({ data }) {
  const chartData = {
    labels: data.map(item => `${item.model} ${item.year}`),
    datasets: [
      {
        label: 'Fuel Economy',
        data: data.map(item => item.fuel_economy),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Fuel Economy by Model and Year',
      },
    },
  };

  return (
    <div>
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default FuelEconomyChart;

