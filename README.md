# Training App

This project is a web application designed to facilitate sign-ups for training sessions. Users can provide necessary information such as their name, surname, email address, and photo, and select a training day and time. The application also fetches holiday data from the Ninja API to exclude Sundays and public holidays as training days, marking them as unavailable for selection and providing information about the holidays next to their names.

## Table of Contents
1. [Demo](#demo)
2. [Description](#description)
3. [Technologies Used](#technologies-used)
4. [Getting Started](#getting-started)

## Demo
Check out the live demo of the application [here](https://mizdebski77.github.io/Training-App/).

## Description
The Training App is built using React and utilizes HTML and CSS for structuring and styling. It leverages Tailwind CSS and Styled Components for enhanced styling capabilities. Tanstack Query is used for data fetching, enabling seamless integration with the Ninja API for retrieving holiday data. The application provides a user-friendly interface for signing up for training sessions while intelligently excluding unavailable days based on holidays and Sundays.

## Technologies Used
- React
- HTML
- CSS
- Tailwind CSS
- Tanstack Query
- Styled Components
- API (Ninja API for holiday data)

## Getting Started
To get a local copy up and running, follow these steps:

1. Clone the repository.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.
4. Run `npm start` to start the development server.
5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

To build the application for production, run `npm run build`. This command will create a production-ready build in the `build` folder, optimized for performance.
