## Overview

CoRent is a React-based web application for managing property rentals, including houses and rooms. This README provides instructions for setting up and running the Room Rover application.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js: You should have Node.js installed on your development machine. You can download it from [https://nodejs.org/](https://nodejs.org/).

## Getting Started

To get started with Room Rover, follow these steps:

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/your-username/room-rover.git

   ```

2. Change to the project directory:
   cd cartRabit

3. Install the project dependencies using npm/ yarn
   npm install

4. Start the development server:
   npm start
   This will start the React development server. You can access the application at http://localhost:3000 in your web browser.

<TO INTEGRTE THE API MAKE SURE THE SERVER RUNS AT PORT 5000 if not ADD THE PORT IN WHICH SERVER IS RUNNING TO THE Client/src/api/api.js const API = axios.create({ baseURL: "http://localhost:5000" });>

"dependencies": {
"@reduxjs/toolkit": "^1.9.6",
"@testing-library/jest-dom": "^5.17.0",
"@testing-library/react": "^13.4.0",
"@testing-library/user-event": "^13.5.0",
"axios": "^1.5.1",
"dotenv": "^16.3.1",
"react": "^18.2.0",
"react-datepicker": "^4.18.0",
"react-dom": "^18.2.0",
"react-minimal-pie-chart": "^8.4.0",
"react-modern-calendar-datepicker": "^3.1.6",
"react-redux": "^8.1.3",
"react-router-dom": "^6.16.0",
"react-scripts": "5.0.1",
"web-vitals": "^2.1.4"
}

The instructions to run the server is availabe in the Server/readme.md file

Deployment
To deploy the Room Rover application to a production environment, you can follow these steps:

        1. Build the production-ready version of the application:
            npm run build

        2. The build process will generate a build directory containing the optimized production build of  the application.

        3. You can deploy the contents of the build directory to a web hosting service or platform of your choice
