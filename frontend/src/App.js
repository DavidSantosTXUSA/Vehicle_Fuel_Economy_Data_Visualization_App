// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FuelEconomyChart from './FuelEconomyChart';
function App() {
	const [data, setData] = useState([]);
	const [modelFilter, setModelFilter] = useState('');
	const [yearFilter, setYearFilter] = useState('');

	useEffect(() => {
			fetchData();
			}, []);

	const fetchData = () => {
		axios.get('http://localhost:5001/api/data', {
params: {
model: modelFilter,
year: yearFilter
}
})
.then(response => {
		setData(response.data);
		})
.catch(error => {
		console.error('There was an error fetching data!', error);
		});
};

const handleFilterChange = () => {
	fetchData();
};

return (
		<div>
		<h1>Toyota Fuel Economy Data</h1>
		<div>
		<input
		type="text"
		placeholder="Model"
		value={modelFilter}
		onChange={(e) => setModelFilter(e.target.value)}
		/>
		<input
		type="number"
		placeholder="Year"
		value={yearFilter}
		onChange={(e) => setYearFilter(e.target.value)}
		/>
		<button onClick={handleFilterChange}>Filter</button>
		</div>
		<table>
		<thead>
		<tr>
<th>Model</th>
<th>Year</th>
<th>Engine Type</th>
<th>Fuel Economy</th>
</tr>
</thead>
<tbody>
{data.map((item) => (
			<tr key={item.id}>
			<td>{item.model}</td>
			<td>{item.year}</td>
			<td>{item.engine_type}</td>
			<td>{item.fuel_economy}</td>
			</tr>
		    ))}
</tbody>
</table>
<FuelEconomyChart data={data} />
</div>
);
}

export default App;

