// DataTable.js
import React from 'react';

function DataTable({ data }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Year</th>
          <th>Manufacturer</th>
          <th>Division</th>
          <th>Car Model</th>
          <th>City FE</th>
          <th>Hwy FE</th>
          <th>Comb FE</th>
          <th>Annual Fuel Cost</th>
          <th>Fuel Efficiency Rating</th>
          <th>GHG Rating</th>
          <th>Money 5 Years</th>
          <th>City CO2</th>
          <th>Hwy CO2</th>
          <th>Comb CO2</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.year}</td>
            <td>{item.manufacturer}</td>
            <td>{item.division}</td>
            <td>{item.car_model}</td>
            <td>{item.city_fe}</td>
            <td>{item.hwy_fe}</td>
            <td>{item.comb_fe}</td>
            <td>{item.annual_fuel_cost_conventional}</td>
            <td>{item.fuel_efficiency_rating}</td>
            <td>{item.ghg_rating}</td>
            <td>{item.money_5yrs}</td>
            <td>{item.city_co2}</td>
            <td>{item.hwy_co2}</td>
            <td>{item.comb_co2}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default DataTable;

