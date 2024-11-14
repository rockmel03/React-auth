# Express Authentication Backend

This is a Node.js/Express backend server that provides JWT-based authentication functionality.

## Features

- User Registration and Login
- JWT Token Authentication
- Access & Refresh Token Management
- MongoDB Database Integration
- Secure Password Hashing
- Environment Variable Configuration
- Express Middleware for Route Protection

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Database
- npm or yarn

## Installation

1. Clone the repository
2. Navigate to the project directory:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Environment Configuration

1. Create a `.env` file in the root directory
2. Copy the contents from `.env.sample`
3. Update the following variables:
   ```
   PORT=8080
   MONGODB_URI=<your-mongodb-uri>
   ACCESS_TOKEN_SECRET_KEY=<your-accesstoken-secret>
   ACCESS_TOKEN_EXPIRY=10s
   REFRESH_TOKEN_SECRET_KEY=<your-refreshtoken-secret>
   REFRESH_TOKEN_EXPIRY=1d
   NODE_ENV=development
   ```

## Running the Server

1. Start the server:
   ```bash
   npm start
   ```
   For development with nodemon:
   ```bash
   npm run dev
   ```

The server will start on [http://localhost:8080](http://localhost:8080)

## API Endpoints

### Authentication Routes

- `POST /users/register` - Register a new user
- `POST /users/login` - Login user
- `POST /users/refresh` - Refresh access token
- `POST /users/logout` - Logout user

### Protected Routes

- `GET /users/profile` - Get user profile (requires authentication)

## Security Features

- Password hashing using bcrypt
- JWT token validation
- HTTP-only cookies for refresh tokens
- Environment variable protection
- CORS configuration

## Database

The application uses MongoDB as its database, with Mongoose as the ODM (Object Data Modeling) library. The database connection is configured using the MONGODB_URI environment variable.

## Error Handling

The application includes comprehensive error handling for:
- Validation errors
- Authentication errors
- Database errors
- Server errors

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

