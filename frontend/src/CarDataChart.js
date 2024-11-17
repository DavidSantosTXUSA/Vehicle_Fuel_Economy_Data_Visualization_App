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
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Combined Fuel Economy by Car Model',
        color: '#ffffff', // Title color
        font: {
          size: 18,
          weight: 'bold',
        },
      },
      legend: {
        labels: {
          color: '#ffffff', // Legend text color
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        bodyFont: {
          size: 14,
        },
        titleFont: {
          size: 16,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#ffffff', // X-axis labels color
          font: {
            size: 12,
          },
        },
        title: {
          display: true,
          text: 'Car Models',
          color: '#ffffff', // X-axis title color
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      y: {
        ticks: {
          color: '#ffffff', // Y-axis labels color
          font: {
            size: 12,
          },
        },
        title: {
          display: true,
          text: 'Combined Fuel Economy (MPG)',
          color: '#ffffff', // Y-axis title color
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default CarDataChart;