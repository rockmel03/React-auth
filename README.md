# Authentication Projects

This repository contains three different authentication implementations to demonstrate various approaches to handling user authentication in React applications.

## Project Structure

- [auth0/](./auth0) - Auth0 Integration Example
- [frontend/](./frontend) - Client-side JWT Authentication
- [redux-auth/](./redux-auth) - Redux + JWT Authentication
- [backend/](./backend) - Express Backend Server

## Auth0 Project (/auth0)

Demonstrates integration of Auth0 authentication service with React:

- Auth0 SDK implementation
- Protected routes using Auth0 guards
- User profile management
- Login/Logout functionality
- Auth0 configuration and setup

See [auth0/README.md](./auth0/README.md) for detailed setup instructions.

## Frontend Project (/frontend)

Showcases client-side authentication using JWT:

- JWT token-based authentication
- Axios for API requests
- Axios interceptors for token refresh
- Protected route implementation
- Login/Register functionality
- Token storage and management
- Error handling

See [frontend/README.md](./frontend/README.md) for detailed setup instructions.

## Redux Auth Project (/redux-auth)

Implements authentication with Redux state management:

- Redux + React-Redux integration
- JWT authentication flow
- Centralized state management
- Automatic token refresh
- Protected routes
- Redux actions and reducers for auth
- Redux middleware for API calls

See [redux-auth/README.md](./redux-auth/README.md) for detailed setup instructions.

## Backend Server (/backend)

Provides the API server for frontend and redux-auth projects:

- Express.js REST API
- JWT token generation and validation
- Refresh token rotation
- MongoDB database integration
- User authentication endpoints
- Protected routes
- Error handling

See [backend/README.md](./backend/README.md) for detailed setup instructions.

## Getting Started

1. Clone the repository
2. Navigate to desired project directory
3. Install dependencies:
   ```bash
   npm install
   ```
4. Follow the setup guide in respective project's README file

## Acknowledgements

Special thanks to Dave Gray for his excellent tutorials and guidance on YouTube. His channel has been instrumental in the development of the following projects:

- [React Authentication Frontend](./frontend/README.md)
- [Redux Authentication Demo](./redux-auth/README.md)
- [Auth0 React Authentication Demo](./auth0/README.md)

Check out his YouTube channel for more great content: [Dave Gray on YouTube](https://www.youtube.com/c/DaveGrayTeachesCode)
