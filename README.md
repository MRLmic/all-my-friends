# all-my-friends

## Description

Full Stack Phone Book App using React.js & .NET Core

## Tech Stack

- React.js (Frontend)
- ASP.NET Core 8.0 (Backend)
- PostgreSQL (Database)
- Entity Framework Core
- Bootstrap (UI Styling)

## Installation

### Pre-requisites

Make sure you have the following already installed:
1. [Node.js](https://nodejs.org/)
2. [Dotnet SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
3. [PostgreSQL](https://www.postgresql.org/)

### App Setup
1. Clone the [Github Repo](https://github.com/MRLmic/all-my-friends).
2. Make sure Postgres is running and make note of the port it is using.
3. Setup your `appSettings.json` file in the root directory, making sure your connection string has correct values for your Username, Password, and Port.
4. Navigate to the client directory and run `npm install` to make sure front end dependencies are installed and available.
5. Navigate to the server directory and run `dotnet build` to make sure back end packages are available and run the compiler.

### App Startup
To start the app, run `npm run dev` from the client directory. Then run `dotnet run` from the root of the server directory. The backend 
should create and seed a database on startup in the development environment if your connection string is set up correctly and your user has correct permissions. 

### Development Tools
- To see available API endpoints, including request body structure, expected return and other relevant info, 
with the app running locally, navigate to the [swagger](https://swagger.io/) API documentation [here](http://localhost:5265/swagger/index.html)

#### Libraries
- [React Phone Number Input](https://gitlab.com/catamphetamine/react-phone-number-input)
- [React Icons](https://react-icons.github.io/react-icons/)
- [React Device Sizes](https://github.com/mahadev-mandal/react-device-sizes#readme)