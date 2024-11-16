import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from './DataTable';
import CarDataChart from './CarDataChart';
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
		<div>
		<h1>Toyota Fuel Economy Data</h1>
		<div style={{ marginBottom: '20px' }}>
		<input
		type="number"
		placeholder="Year"
		value={yearFilter}
		onChange={(e) => setYearFilter(e.target.value)}
		style={{ marginRight: '10px' }}
		/>
		<input
		type="text"
		placeholder="Manufacturer"
		value={manufacturerFilter}
		onChange={(e) => setManufacturerFilter(e.target.value)}
		style={{ marginRight: '10px' }}
		/>
		<input
		type="text"
		placeholder="Division"
value={divisionFilter}
onChange={(e) => setDivisionFilter(e.target.value)}
style={{ marginRight: '10px' }}
/>
<input
type="text"
placeholder="Car Model"
value={carModelFilter}
onChange={(e) => setCarModelFilter(e.target.value)}
style={{ marginRight: '10px' }}
/>
</div>
<DataTable data={data} />
<CarDataChart data={data} />
)}
</div>
);
}

export default App;

