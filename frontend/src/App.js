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

  // All unique options for dropdowns
  const [allYears, setAllYears] = useState([]);
  const [allManufacturers, setAllManufacturers] = useState([]);
  const [allDivisions, setAllDivisions] = useState([]);
  const [allCarModels, setAllCarModels] = useState([]);

  // Sort Options
  const [sortOption, setSortOption] = useState('');
  const [sortProperty, setSortProperty] = useState('comb_fe'); // Default sort property

  const [searchPerformed, setSearchPerformed] = useState(false);

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

  // Fetch all data on mount to populate dropdowns
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5001/api/car-data'); // Fetch all data
        const fetchedData = response.data;

        // Extract unique values for dropdowns
        const uniqueYears = [...new Set(fetchedData.map((item) => item.year))];
        const uniqueManufacturers = [...new Set(fetchedData.map((item) => item.manufacturer))];
        const uniqueDivisions = [...new Set(fetchedData.map((item) => item.division))];
        const uniqueCarModels = [...new Set(fetchedData.map((item) => item.car_model))];

        // Save options for dropdowns
        setAllYears(uniqueYears);
        setAllManufacturers(uniqueManufacturers);
        setAllDivisions(uniqueDivisions);
        setAllCarModels(uniqueCarModels);

        setData(fetchedData); // Store the data for the chart
      } catch (err) {
        console.error('Error fetching initial data:', err);
        setError('Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []); // Runs once on component mount

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

      const fetchedData = response.data;
      setData(fetchedData); // Update only the data to be displayed (chart/table)

      setSearchPerformed(true);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSort = () => {
    const sortedData = [...data];

    if (sortOption === 'greatest') {
      sortedData.sort((a, b) => b[sortProperty] - a[sortProperty]); // Sort by descending order of the selected property
    } else if (sortOption === 'least') {
      sortedData.sort((a, b) => a[sortProperty] - b[sortProperty]); // Sort by ascending order of the selected property
    }

    setData(sortedData);
  };

  return (
    <div className="App">
      <header className="App-header fade-in">
        <h1>Vehicle Fuel Economy Data</h1>
        <div className="filter-container fade-in">
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">Select a Year</option>
            {allYears.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>

          <select
            value={manufacturerFilter}
            onChange={(e) => setManufacturerFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">Select a Manufacturer</option>
            {allManufacturers.map((manufacturer, index) => (
              <option key={index} value={manufacturer}>
                {manufacturer}
              </option>
            ))}
          </select>

          <select
            value={divisionFilter}
            onChange={(e) => setDivisionFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">Select a Division</option>
            {allDivisions.map((division, index) => (
              <option key={index} value={division}>
                {division}
              </option>
            ))}
          </select>

          <select
            value={carModelFilter}
            onChange={(e) => setCarModelFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">Select a Car Model</option>
            {allCarModels.map((model, index) => (
              <option key={index} value={model}>
                {model}
              </option>
            ))}
          </select>

          <button onClick={handleSearch}>Search</button>
        </div>

        <div className="sort-container fade-in">
          <select
            value={sortProperty}
            onChange={(e) => setSortProperty(e.target.value)}
            className="filter-select"
          >
            <option value="comb_fe">Combined Fuel Economy</option>
            <option value="city_fe">City Fuel Economy</option>
            <option value="hwy_fe">Highway Fuel Economy</option>
            <option value="annual_fuel_cost_conventional">Annual Fuel Cost</option>
            <option value="fuel_efficiency_rating">Fuel Efficiency Rating</option>
            <option value="ghg_rating">GHG Rating</option>
            <option value="money_5yrs">Money Saved Over 5 Years</option>
            <option value="city_co2">City CO2 Emissions</option>
            <option value="hwy_co2">Highway CO2 Emissions</option>
            <option value="comb_co2">Combined CO2 Emissions</option>
          </select>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="filter-select"
          >
            <option value="">Sort by...</option>
            <option value="greatest">Greatest to Least</option>
            <option value="least">Least to Greatest</option>
          </select>
          <button onClick={handleSort}>Sort</button>
        </div>
      </header>

      <div className="chart-container fade-in">
        {!searchPerformed && !loading && !error && (
          <p className="placeholder-text">Perform a search to display a chart.</p>
        )}
        {loading && <p>Loading...</p>}
        {!loading && searchPerformed && !error && (
          <CarDataChart
            data={data}
            manufacturer={manufacturerFilter}
            division={divisionFilter}
            year={yearFilter}
            searchPerformed={searchPerformed}
            datasetVisibility={datasetVisibility}
            setDatasetVisibility={setDatasetVisibility}
          />
        )}
        {error && <p className="error">{error}</p>}
      </div>
      <div className="table-container fade-in">
        {!searchPerformed && !loading && !error && (
          <p className="placeholder-text">Perform a search to display a table.</p>
        )}
        {loading && <p>Loading...</p>}
        {!loading && searchPerformed && !error && <DataTable data={data} />}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default App;
