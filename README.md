# Dynamic Surge Pricing System

This project implements a dynamic surge pricing system for a food delivery platform using Node.js, React, PostgreSQL, and Redis.

## Prerequisites

- Node.js (v14 or later)
- Docker
- Git
- RapidAPI account (for weather data)

## Obtaining Weather API Key

1. Sign up for a RapidAPI account at https://rapidapi.com/
2. Subscribe to the "Open Weather Map" API: https://rapidapi.com/community/api/open-weather-map/
3. After subscribing, go to the "Endpoints" tab and find your API key (X-RapidAPI-Key)
4. Copy this key; you'll need it for the `.env` file in the project setup

## Project Setup

1. Clone the project:

   ```
   git clone https://github.com/killua2312/dynamic-surge-pricing.git
   cd dynamic-surge-pricing
   ```

2. Docker Setup:

    Create a .env file in the Root directory with the following variables:

    ```
    POSTGRE_DB=surge_pricing
    POSTGRE_USER=your_user
    POSTGRE_PASS=your_password
    POSTGRE_PORT=5432
    ```

    Build and Start the docker containers using docker-compose file:

    ```bash
    docker compose --build up -d
    
    ```

    This start postgresql and redis containers.

3. Backend Setup:

   ```
   cd Backend
   npm install
   ```

   Create a `.env` file in the Backend directory with the following variables:

   Variables **POSTGRE_DB**, **POSTGRE_USER**, **POSTGRE_PASS**, **POSTGRE_PORT** should be same as Root directory `.env`.

   ```
   PORT=3000
   POSTGRE_DB=surge_pricing
   POSTGRE_USER=surge_user
   POSTGRE_PASS=your_password
   POSTGRE_PORT=5432
   REDIS_URL=redis://localhost:6379
   JWT_SECRET=your_jwt_secret
   OPENWEATHER_API_KEY=your_rapidapi_key
   ```

   Start the server:

   ```
   node server.js
   ```

4. Frontend Setup:

   ```
   cd ../frontend
   npm install
   npm run dev
   ```

## API Documentation

The API documentation is available via Swagger UI. To access it:

1. Start the backend server.
2. Open a web browser and navigate to `http://localhost:3000/api-docs`.

## User Sign Up and Login

To add mock data to test this project you need to signup and login to get a jwt_token for authentication.

1. Create a user with manager or admin role using Swagger UI signup endpoint or frontend UI Signup directly.
2. Login with those credentials using Swagger UI login endpoint and the token is given in response.
3. There's an authorize field at the top right corner, Click and copy paste the token in that field.
4. Now you can add mockup data after authorization.

## Adding Mock Data

You can use the Swagger UI to add mock data for orders and drivers. This is useful for testing and development purposes. Here's how to do it:

1. Start the backend server.
2. Open a web browser and navigate to `http://localhost:3000/api-docs`.
3. Find the POST endpoints for creating orders and drivers.

### Adding Mock Orders

Use the `/api/orders` POST endpoint to add orders. Here are some sample order data you can use:

```json
{
  "customer_latitude": 17.385,
  "customer_longitude": 78.4867,
  "restaurant_latitude": 17.3891,
  "restaurant_longitude": 78.4906,
  "status": "active",
  "total_amount": 450.75
}
```

```json
{
  "customer_latitude": 17.44,
  "customer_longitude": 78.3844,
  "restaurant_latitude": 17.4423,
  "restaurant_longitude": 78.3801,
  "status": "delivered",
  "total_amount": 325.5
}
```

```json
{
  "customer_latitude": 17.4156,
  "customer_longitude": 78.4347,
  "restaurant_latitude": 17.4201,
  "restaurant_longitude": 78.438,
  "status": "active",
  "total_amount": 550.25
}
```

```json
{
  "customer_latitude": 17.3617,
  "customer_longitude": 78.4747,
  "restaurant_latitude": 17.365,
  "restaurant_longitude": 78.476,
  "status": "cancelled",
  "total_amount": 275.0
}
```

Note: The `id`, `driver_id`, and `order_time` fields will be automatically generated when you create the order.

### Adding Mock Drivers

Use the `/api/drivers` POST endpoint to add drivers. Here are some sample driver data you can use:

```json
{
  "name": "Rahul Kumar",
  "email": "rahul.kumar@example.com",
  "phone": "9876543210",
  "status": "available",
  "current_latitude": 17.39,
  "current_longitude": 78.49
}
```

```json
{
  "name": "Priya Sharma",
  "email": "priya.sharma@example.com",
  "phone": "9876543211",
  "status": "unavailable",
  "current_latitude": 17.445,
  "current_longitude": 78.385
}
```

```json
{
  "name": "Amit Patel",
  "email": "amit.patel@example.com",
  "phone": "9876543212",
  "status": "available",
  "current_latitude": 17.42,
  "current_longitude": 78.435
}
```

Note: The `id` field will be automatically generated when you create the driver.

Remember to add these mock data entries one by one using the Swagger UI interface. After adding the data, you can use the GET endpoints to verify that the data has been successfully added to the system.

## API Endpoints

Here are the main API endpoints:

- `/api/auth`: Authentication routes (login, signup)
- `/api/drivers`: Driver management routes
- `/api/orders`: Order management routes
- `/api/surge-pricing`: Surge pricing calculation routes
- `/api/analytics`: Analytics routes for surge pricing data

For detailed information on each endpoint, please refer to the Swagger UI documentation.

## Additional Information

- The backend uses Socket.IO for real-time updates. Make sure your client is configured to connect to the WebSocket server.
- The frontend is built with React and uses Vite as the build tool.
- The project uses JWT for authentication. Make sure to include the JWT token in the Authorization header for protected routes.
- The surge pricing algorithm takes into account factors such as driver availability, order demand, and weather conditions.
- The analytics endpoints provide insights into surge pricing frequency, average multipliers, and area-based statistics.
- Winston is used for logging, providing detailed and structured logs for better debugging and monitoring.
- Rate limiting is implemented to protect the API from abuse and ensure fair usage.
