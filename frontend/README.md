# React Authentication Frontend

This project is a React-based frontend application that handles user authentication.

## Features

- User Registration
- User Login
- Protected Routes
- JWT Token Management
- Responsive Design
- Form Validation

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the project directory:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Application

1. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
2. Open [http://localhost:5173](http://localhost:5173) in your browser


### Running the Backend

For the application to work properly, you'll need to run the backend server alongside the frontend. Please follow these steps:

1. Make sure you have the backend repository cloned and set up
2. Navigate to the backend directory
3. Install backend dependencies:
   ```bash
   npm install
   ```
4. Configure environment variables:
   - Locate the `.env.sample` file in the backend directory
   - Create a new file named `.env`
   - Copy all contents from `.env.sample` to `.env`
   - Update the values in `.env` according to your setup:
     ```
     ACCESS_TOKEN_SECRET=your_access_token_secret
     REFRESH_TOKEN_SECRET=your_refresh_token_secret
     MONGODB_URI=your_mongodb_connection_string
     ```
5. Start the backend server:
   ```bash
   npm start
   ```

The backend server typically runs on [http://localhost:8080](http://localhost:8080)

> **Note:** Make sure both frontend and backend servers are running simultaneously for the application to function correctly.






