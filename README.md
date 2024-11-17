# Vechicle Fuel Economy Analysis App!

An application to analyze vehicle fuel economy data from 2021 to 2025.

## Setup Instructions

### 1. Clone the Repository

```bash
  git clone https://github.com/DavidSantosTXUSA/GreenGearAnalytics.git
  cd GreenGearAnalytics
```
### 2. Install Dependencies

GreenGearAnalytics
```bash
brew install postgresql
npm install chart.js@^4.3.0 react-chartjs-2@^5.2.0
```

### Backend
```bash
cd backend
npm install
```bash 
touch .env 
vim .env
```

inside the .env file put
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/toyota_fuel_economy

and if you need to create a new user do the following

```bash
psql -U postgres 
CREATE USER your_username WITH PASSWORD 'your_password';
```

### Frontend

```bash
cd frontend
npm install
npm install axios
```
### 3. Import CSV Data

Connect to PostgreSQL and create the database:

```bash
psql -U your_username
CREATE DATABASE database_name;
\c database_name;
```

### Create the fuel_usage table:

```sql
CREATE TABLE fuel_usage (
  id SERIAL PRIMARY KEY,
  year INT,
  manufacturer VARCHAR(100),
  division VARCHAR(100),
  car_model VARCHAR(100),
  city_fe_conventional DECIMAL(5,2),
  city_fe_alternative DECIMAL(5,2),
  hwy_fe_conventional DECIMAL(5,2),
  hwy_fe_alternative DECIMAL(5,2),
  comb_fe_conventional DECIMAL(5,2),
  comb_fe_alternative DECIMAL(5,2),
  annual_fuel_cost_conventional DECIMAL(10,2),
  annual_fuel_cost_alternative DECIMAL(10,2),
  fuel_efficiency_rating INT,
  ghg_rating INT,
  savings_5yrs DECIMAL(10,2),
  spending_5yrs DECIMAL(10,2),
  city_co2 DECIMAL(10,2),
  hwy_co2 DECIMAL(10,2),
  comb_co2 DECIMAL(10,2)
);
```
### Import Data

```sql
\COPY fuel_usage(
  year,
  manufacturer,
  division,
  car_model,
  city_fe_conventional,
  city_fe_alternative,
  hwy_fe_conventional,
  hwy_fe_alternative,
  comb_fe_conventional,
  comb_fe_alternative,
  annual_fuel_cost_conventional,
  annual_fuel_cost_alternative,
  fuel_efficiency_rating,
  ghg_rating,
  savings_5yrs,
  spending_5yrs,
  city_co2,
  hwy_co2,
  comb_co2
)
FROM '/path/to/your/data.csv' DELIMITER ',' CSV HEADER;
```
### Replace /path/to/your/data.csv with the actual path to your CSV file.

### Exit psql

```sql
\q
```

### 4. Run the Application
Start the Backend Server
In the backend directory:

```bash
npm run dev
```

Start the Frontend Server
In the frontend directory:

```bash
npm start
```

### 5. Access the Application
Open your browser and navigate to http://localhost:3000.

