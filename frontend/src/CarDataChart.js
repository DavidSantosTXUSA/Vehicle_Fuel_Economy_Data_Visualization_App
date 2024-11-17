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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
function CarDataChart({
  data,
  manufacturer,
  division,
  year,
  datasetVisibility,
  setDatasetVisibility,
}) {
  const datasets = [
    {
      label: 'Combined FE (MPG)',
      data: data.map((item) => item.comb_fe),
      backgroundColor: '#4dd0e1',
      borderColor: '#4dd0e1',
      borderWidth: 1,
      hidden: !datasetVisibility.combinedFE,
    },
    {
      label: 'City FE (MPG)',
      data: data.map((item) => item.city_fe),
      backgroundColor: '#33FF57',
      borderColor: '#33FF57',
      borderWidth: 1,
      hidden: !datasetVisibility.cityFE,
    },
    {
      label: 'Highway FE (MPG)',
      data: data.map((item) => item.hwy_fe),
      backgroundColor: '#3357FF',
      borderColor: '#3357FF',
      borderWidth: 1,
      hidden: !datasetVisibility.highwayFE,
    },
    {
      label: 'Annual fuel cost ($)',
      data: data.map((item) => item.annual_fuel_cost_conventional),
      backgroundColor: '#FFC733',
      borderColor: '#FFC733',
      borderWidth: 1,
      hidden: !datasetVisibility.annualFuelCost,
    },
    {
      label: 'Fuel Efficiency Rating',
      data: data.map((item) => item.fuel_efficiency_rating),
      backgroundColor: '#FF33A1',
      borderColor: '#FF33A1',
      borderWidth: 1,
      hidden: !datasetVisibility.fuelEfficiencyRating,
    },
    {
      label: 'GHG Rating',
      data: data.map((item) => item.ghg_rating),
      backgroundColor: '#33FFF7',
      borderColor: '#33FFF7',
      borderWidth: 1,
      hidden: !datasetVisibility.ghgRating,
    },
    {
      label: 'Money saved over 5 Years ($)',
      data: data.map((item) => item.money_5yrs),
      backgroundColor: '#8D33FF',
      borderColor: '#8D33FF',
      borderWidth: 1,
      hidden: !datasetVisibility.moneySaved5Years,
    },
    {
      label: 'City CO2 emissions (Tons)',
      data: data.map((item) => item.city_co2),
      backgroundColor: '#FF8C33',
      borderColor: '#FF8C33',
      borderWidth: 1,
      hidden: !datasetVisibility.cityCO2Emissions,
    },
    {
      label: 'Highway CO2 emissions (Tons)',
      data: data.map((item) => item.hwy_co2),
      backgroundColor: '#33FF8C',
      borderColor: '#33FF8C',
      borderWidth: 1,
      hidden: !datasetVisibility.highwayCO2Emissions,
    },
    {
      label: 'Combined CO2 emissions (Tons)',
      data: data.map((item) => item.comb_co2),
      backgroundColor: '#FF3333',
      borderColor: '#FF3333',
      borderWidth: 1,
      hidden: !datasetVisibility.combinedCO2Emissions,
    },
  ];
  const chartData = {
    labels: data.map((item) => `${item.car_model} ${item.year}`),
    datasets: datasets,
  };
  const handleLegendClick = (e, legendItem, legend) => {
    const datasetIndex = legendItem.datasetIndex;
    const chart = legend.chart;
    const dataset = chart.data.datasets[datasetIndex];
    const isVisible = !chart.isDatasetVisible(datasetIndex);

    // Update visibility in the chart
    chart.setDatasetVisibility(datasetIndex, isVisible);

    // Update visibility state in parent
    const updatedVisibility = { ...datasetVisibility };
    switch (dataset.label) {
      case 'Combined FE (MPG)':
        updatedVisibility.combinedFE = isVisible;
        break;
      case 'City FE (MPG)':
        updatedVisibility.cityFE = isVisible;
        break;
      case 'Highway FE (MPG)':
        updatedVisibility.highwayFE = isVisible;
        break;
      case 'Annual fuel cost ($)':
        updatedVisibility.annualFuelCost = isVisible;
        break;
      case 'Fuel Efficiency Rating':
        updatedVisibility.fuelEfficiencyRating = isVisible;
        break;
      case 'GHG Rating':
        updatedVisibility.ghgRating = isVisible;
        break;
      case 'Money saved over 5 Years ($)':
        updatedVisibility.moneySaved5Years = isVisible;
        break;
      case 'City CO2 emissions (Tons)':
        updatedVisibility.cityCO2Emissions = isVisible;
        break;
      case 'Highway CO2 emissions (Tons)':
        updatedVisibility.highwayCO2Emissions = isVisible;
        break;
      case 'Combined CO2 emissions (Tons)':
        updatedVisibility.combinedCO2Emissions = isVisible;
        break;
      default:
        break;
    }
    setDatasetVisibility(updatedVisibility);

    chart.update();
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: `Combined FE (MPG) Data for ${manufacturer || 'all manufacturers'}${
          division ? ` (${division})` : ''
        } in ${year || 'all years'}`,
        color: '#ffffff',
        font: { size: 18, weight: 'bold' },
      },
      legend: {
        labels: {
          color: '#ffffff',
          font: { size: 14 },
        },
        onClick: handleLegendClick,
      },
    },
    scales: {
      x: {
        ticks: { color: '#f5f5f5', font: { size: 12 } },
        title: { display: true, text: 'Car Models', color: '#f5f5f5', font: { size: 14, weight: 'bold' } },
      },
      y: {
        ticks: { color: '#f5f5f5', font: { size: 12 } },
        title: { display: true, text: 'Fuel Economy (MPG)', color: '#f5f5f5', font: { size: 14, weight: 'bold' } },
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
