# Auth0 React Authentication Demo

A React application demonstrating authentication implementation using Auth0, built with Vite and React.

## Features

- User authentication with Auth0
- Login/Logout functionality
- User profile display
- Protected routes
- Responsive design

## Prerequisites

Before you begin, ensure you have:

- Node.js installed (v14 or higher)
- An Auth0 account and application set up
- Your Auth0 domain and client ID

## Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd auth0
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with your Auth0 credentials:

```env
VITE_REACT_APP_AUTH0_DOMAIN=your-domain.auth0.com
VITE_REACT_APP_AUTH0_CLIENT_ID=your-client-id
```

4. Start the development server:

```bash
npm run dev
```

## Environment Variables

The following environment variables are required:

- `VITE_REACT_APP_AUTH0_DOMAIN`: Your Auth0 domain
- `VITE_REACT_APP_AUTH0_CLIENT_ID`: Your Auth0 client ID

## Project Structure

```
auth0/
├── src/
│   ├── components/
│   │   ├── LoginButton.jsx
│   │   ├── LogoutButton.jsx
│   │   ├── Profile.jsx
│   │   └── index.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
└── package.json
```

## Dependencies

- React
- @auth0/auth0-react
- Vite (as build tool)

## Auth0 Configuration

1. Create a new application in Auth0 Dashboard
2. Configure the following settings:
   - Allowed Callback URLs: `http://localhost:5173`
   - Allowed Logout URLs: `http://localhost:5173`
   - Allowed Web Origins: `http://localhost:5173`

## Available Scripts

- `npm run dev` - Starts development server
- `npm run build` - Creates production build
- `npm run preview` - Previews production build locally

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

- [Auth0](https://auth0.com/) for authentication services
- [React](https://reactjs.org/) documentation
- [Vite](https://vitejs.dev/) for the build tool
