# Vehicle Fuel Economy Data Visualization App

An interactive web application that allows users to visualize and analyze vehicle fuel economy data from 2021 to 2025. The app provides filtering options, sorting, and dynamic charts to help users gain insights into fuel efficiency, CO<sub>2</sub> emissions, and other important metrics.

## Youtube demo!

https://www.youtube.com/watch?v=HvtVZsljaiQ

## Screenshots!

| Sorted Chart | Unsorted Query |
|------------|-------------------|
| ![Chart1](./screenshot1.png) | ![](./screenshot2.png) |

| AI Chat bot | AI chat Bot 2 |
|--------------------------|------------|
| ![](./screenshot3.png) | ![](./screenshot4.png) |

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

### AI CHATBOT FEATURE

This web application helps users analyze vehicle fuel economy data (2021–2025) by leveraging AI. Users can input vehicle details and receive insights such as fuel efficiency, annual fuel costs, and comparisons with other vehicles.

## Features
Analyze vehicle performance metrics like fuel economy, greenhouse gas ratings, and CO2 emissions.
Compare selected vehicles with similar models from the dataset.
AI-powered recommendations for more fuel-efficient vehicles.

## Prerequisites
Make sure you have the following installed:

- Node.js (v18 or later)
- Git
- PostgreSQL (for the backend database)
- API Key from OpenAI

## Installation

- Clone the Repository

        bash
        git clone https://github.com/username/repository-name.git
        cd repository-name
    
- Install Dependencies

        npm install

- Run the following command to install the required Node.js packages:

        bash
        npm install


- Set Up the Database

- Make sure your PostgreSQL service is running.
- Create a new database (e.g., vehicle_analysis_db).
- Add your database credentials to a .env file:

        DB_HOST=localhost
        DB_PORT=5432
        DB_USER=your_db_username
        DB_PASSWORD=your_db_password
        DB_NAME=vehicle_analysis_db

- Import the provided SQL schema (if any) to set up the database tables.
- Add OpenAI API Key

In the .env file, add your OpenAI API Key:

        OPENAI_API_KEY=your_openai_api_key

- Start the Application

- Run the following command to start the backend server:

        bash
        Copy code
        node index.js

- Make sure the server is running on port 8080 (or the specified port).
- Run the Frontend

- Ensure your frontend files (HTML, CSS, JS) are set up.
- If needed, you can use a local server (e.g., Live Server) to host the frontend.

## Usage

- Open the frontend in your browser.
- Interact with the AI by entering vehicle details (year, brand, model, etc.).
- The AI will fetch data from the dataset and provide a detailed analysis and comparison.

## Project Structure
# Backend:
- index.js: Main server file to handle API requests.
- openai.service.js: AI integration and file setup for OpenAI API.
# Frontend:
- JavaScript, HTML, and CSS files for user interaction.
# Data:
- cardata.pdf: Dataset used for AI analysis.
