# Food Delivery API

A comprehensive RESTful API for a food delivery platform allowing users to register, authenticate, manage restaurants, browse meals, and place orders.

## Features

- User authentication with JWT
- Role-based access control (customer/restaurant)
- Restaurant management
- Meal catalog with categories
- Order processing system
- Input validation using Joi

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Testing with Postman](#testing-with-postman)
- [Deployment](#deployment)
- [Project Structure](#project-structure)

## Prerequisites

- Node.js (v14.x or higher)
- npm (v6.x or higher)
- MongoDB (v4.x or higher)

## Installation

### Local Development

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/food-delivery-api.git
   cd food-delivery-api
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root with the following variables:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/food-delivery
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

## Configuration

The application uses environment variables for configuration. Here's what each variable represents:

- `PORT`: The port on which the server will run
- `MONGODB_URI`: Connection string for MongoDB
- `JWT_SECRET`: Secret key for signing JWT tokens
- `NODE_ENV`: Environment mode (development, production, test)

## Running the Application

### Development Mode

```bash
# Run with nodemon for auto-reloading during development
npm run dev
```

### Production Mode

```bash
# Build the application
npm run build

# Start the server
npm start
```

## API Documentation

### Base URL

- Local development: `http://localhost:3000/api/v1`
- Production: `https://your-domain.com/api/v1`

### Endpoints Overview

#### User Authentication

- `POST /userauth/register` - Register a new user
- `POST /userauth/login` - Login and get JWT token
- `GET /userauth/me` - Get user profile
- `DELETE /userauth/me` - Delete user account

#### Restaurants

- `GET /restaurants` - List all restaurants
- `GET /restaurants/:id` - Get restaurant details
- `POST /restaurants/:id` - Create a restaurant
- `PATCH /restaurants/me` - Update restaurant details
- `DELETE /restaurants/:id` - Delete a restaurant

#### Meals

- `GET /meals` - List all meals
- `GET /meals/:id` - Get meal details
- `POST /meals/me` - Create a new meal
- `PATCH /meals/:id` - Update a meal
- `DELETE /meals/:id` - Delete a meal

#### Orders

- `GET /orders/me` - List all orders for current user
- `GET /orders/:id` - Get order details
- `POST /orders` - Place a new order
- `PATCH /orders/:id` - Update order status

## Testing with Postman

A Postman collection is available to test all endpoints.

### Importing the Collection

1. Open Postman
2. Click "Import" in the top-left corner
3. Select the `Food_Delivery_API.json` file from the project's `docs` folder
4. Click "Import"

### Setting Up Environment Variables

1. Create a new environment in Postman
2. Add the following variables:
   - `baseUrl`: Set to `http://localhost:3000` for local testing
   - `token`: Leave empty (will be automatically populated after login)
3. Select the environment from the dropdown in the top-right corner

### Testing Flow

1. Register a user using the "Register User" request
2. Login with the "Login User" request (token will be automatically saved)
3. Test other endpoints as needed

## Deployment

### Preparing for Production

1. Update environment variables for production

   ```
   NODE_ENV=production
   MONGODB_URI=your_production_mongodb_uri
   JWT_SECRET=your_production_secret_key
   ```

2. Enable security features

   ```javascript
   // In your app.js or server.js
   const helmet = require("helmet");
   const compression = require("compression");

   app.use(helmet());
   app.use(compression());
   ```

### Deployment Options

#### Heroku

1. Install Heroku CLI and login

   ```bash
   npm install -g heroku
   heroku login
   ```

2. Create a new Heroku app

   ```bash
   heroku create your-app-name
   ```

3. Add MongoDB add-on or configure external MongoDB

   ```bash
   heroku addons:create mongodb:sandbox
   ```

   Or set environment variable for external MongoDB:

   ```bash
   heroku config:set MONGODB_URI=your_mongodb_uri
   ```

4. Set other environment variables

   ```bash
   heroku config:set JWT_SECRET=your_production_secret_key
   heroku config:set NODE_ENV=production
   ```

5. Deploy the application
   ```bash
   git push heroku main
   ```

#### Docker

1. Create a `Dockerfile` in your project root:

   ```dockerfile
   FROM node:14
   WORKDIR /usr/src/app
   COPY package*.json ./
   RUN npm install
   COPY . .
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. Create a `.dockerignore` file:

   ```
   node_modules
   npm-debug.log
   .env
   .git
   ```

3. Build and run the Docker image:
   ```bash
   docker build -t food-delivery-api .
   docker run -p 3000:3000 --env-file .env food-delivery-api
   ```

## Project Structure

```
food-delivery-api/
├── controllers/         # Request handlers
├── middleware/          # Custom middleware
├── models/              # Database models
├── routes/              # API routes
├── utils/               # Helper functions
├── validation/          # Joi validation schemas
├── docs/                # API documentation
├── .env                 # Environment variables
├── .gitignore           # Git ignore file
├── app.js               # Application entry point
├── package.json         # Project dependencies
└── README.md            # Project documentation
```

## Error Handling

The API uses consistent error responses:

```json
{
  "success": false,
  "message": "Error message description"
}
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
