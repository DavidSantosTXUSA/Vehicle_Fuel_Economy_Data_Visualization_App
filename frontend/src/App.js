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
  const [searchPerformed, setSearchPerformed] = useState(false);

  // Visibility state for datasets (persisted across searches)
  const [datasetVisibility, setDatasetVisibility] = useState({
    combinedFE: false,
    cityFE: false,
    highwayFE: false,
    annualFuelCost: false,
    fuelEfficiencyRating: false,
    ghgRating: false,
    moneySaved5Years: false,
    cityCO2Emissions: false,
    highwayCO2Emissions: false,
    combinedCO2Emissions: false,
  });
  const handleSearch = async () => {
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
      setSearchPerformed(true);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header fade-in">
        <h1>Toyota Fuel Economy Data</h1>
        <div className="filter-container fade-in">
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
          <button onClick={handleSearch}>Search</button>
        </div>
      </header>
      <div className="chart-container fade-in">
        {!searchPerformed && !loading && !error && (
          <p className="placeholder-text">Perform a search to display the chart.</p>
        )}
        {loading && <p>Loading...</p>}
        {!loading && searchPerformed && !error && (
          <CarDataChart
            data={data}
            manufacturer={manufacturerFilter}
            division={divisionFilter}
            year={yearFilter}
            datasetVisibility={datasetVisibility}
            setDatasetVisibility={setDatasetVisibility}
          />
        )}
        {error && <p className="error">{error}</p>}
      </div>
      <div className="table-container fade-in">
        {!searchPerformed && !loading && !error && (
          <p className="placeholder-text">Perform a search to display the table.</p>
        )}
        {loading && <p>Loading...</p>}
        {!loading && searchPerformed && !error && <DataTable data={data} />}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default App;
