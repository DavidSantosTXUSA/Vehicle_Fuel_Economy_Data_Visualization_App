# Vehicle Fuel Economy Data Visualization App

An interactive web application that allows users to visualize and analyze vehicle fuel economy data from 2021 to 2025. The app provides filtering options, sorting, and dynamic charts to help users gain insights into fuel efficiency, CO<sub>2</sub> emissions, and other important metrics.

## Features

- **Filtering**: Filter data by year, manufacturer, division, and car model.
- **Sorting**: Sort the results based on various properties like fuel economy, CO<sub>2</sub> emissions, etc.
- **Data Visualization**: Interactive charts displaying the selected datasets.
- **Data Table**: View detailed data in a tabular format.
- **Responsive Design**: Optimized for different screen sizes.

## Prerequisites

- **Node.js** (version 14.x or higher)
- **npm** (Node Package Manager)
- **PostgreSQL** (version 12 or higher)
- **Git** (for cloning the repository)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
cd backend
npm install
```
a.) Set Up Environment Variables
Create a .env file in the backend directory with the following content:
```bash
DATABASE_URL=postgresql://your_username:your_password@localhost:5432/your_database_name
```
b.) Start server
```bash
npm start
```
### 2.) Set up frontend
```bash
cd ../frontend
npm install
npm start
```

### 3.) To access the application navigate to 

http://localhost:3000

### 4.) Install PostgreSQL
```bash
brew install postgresql
brew services start postgresql
psql postgres

CREATE USER your_username WITH PASSWORD 'your_password';

CREATE DATABASE your_database_name OWNER your_username;

GRANT ALL PRIVILEGES ON DATABASE your_database_name TO your_username;

\c database_name;

CREATE TABLE car_data (
    id SERIAL PRIMARY KEY,
    year INT,
    manufacturer VARCHAR(100),
    division VARCHAR(100),
    car_model VARCHAR(150),
    city_fe NUMERIC,
    hwy_fe NUMERIC,
    comb_fe NUMERIC,
    annual_fuel_cost_conventional NUMERIC,
    fuel_efficiency_rating INT,
    ghg_rating INT,
    money_5yrs NUMERIC,
    city_co2 NUMERIC,
    hwy_co2 NUMERIC,
    comb_co2 NUMERIC
);
\COPY car_data(year, manufacturer, division, car_model, city_fe, hwy_fe, comb_fe, annual_fuel_cost_conventional, fuel_efficiency_rating, ghg_rating, money_5yrs, city_co2, hwy_co2, comb_co2)
FROM '/path/to/your/data.csv' DELIMITER ',' CSV HEADER;

\q
```

###Dependencies
##Backend:
express: ^4.17.1
cors: ^2.8.5
dotenv: ^8.2.0
pg: ^8.5.1

##Frontend:
react: ^17.0.2
react-dom: ^17.0.2
axios: ^0.21.1
chart.js: ^3.5.1
react-chartjs-2: ^3.0.3

Notes
Ensure that both the backend and frontend servers are running simultaneously.
Make sure to update the .env file with your actual database credentials.
The backend server runs on port 5001; adjust the frontend API calls if the port is different.

### OPTIONAL HOW TO SET UP THE AI CHATBOT
