import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from './DataTable';
import CarDataChart from './CarDataChart';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [manufacturerFilter, setManufacturerFilter] = useState('');
  const [divisionFilter, setDivisionFilter] = useState('');
  const [carModelFilter, setCarModelFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get('http://localhost:5001/api/car-data', {
          params: {
            year: yearFilter,
            manufacturer: manufacturerFilter,
            division: divisionFilter,
            car_model: carModelFilter,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [yearFilter, manufacturerFilter, divisionFilter, carModelFilter]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Toyota Fuel Economy Data</h1>
        <div className="filter-container">
          <input
            type="number"
            placeholder="Year"
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="filter-input"
          />
          <input
            type="text"
            placeholder="Manufacturer"
            value={manufacturerFilter}
            onChange={(e) => setManufacturerFilter(e.target.value)}
            className="filter-input"
          />
          <input
            type="text"
            placeholder="Division"
            value={divisionFilter}
            onChange={(e) => setDivisionFilter(e.target.value)}
            className="filter-input"
          />
          <input
            type="text"
            placeholder="Car Model"
            value={carModelFilter}
            onChange={(e) => setCarModelFilter(e.target.value)}
            className="filter-input"
          />
        </div>
      </header>
      <div className="table-container">
        {loading ? <p>Loading...</p> : <DataTable data={data} />}
        {error && <p className="error">{error}</p>}
      </div>
      <div className="chart-container">
        <CarDataChart data={data} />
      </div>
    </div>
  );
}

export default App;
