# Node.js CRUD Application

A complete CRUD (Create, Read, Update, Delete) application built with Node.js, Express, and MySQL.

## Features

- RESTful API endpoints
- MySQL database integration
- Input validation middleware
- Error handling
- CORS enabled

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure database:
   - Create a MySQL database
   - Import the schema from `database.sql`
   - Update `.env` file with your database credentials

3. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

- GET `/api/users` - Get all users
- GET `/api/users/:id` - Get a specific user
- POST `/api/users` - Create a new user
- PUT `/api/users/:id` - Update a user
- DELETE `/api/users/:id` - Delete a user

## Request Body Format

For POST and PUT requests:
```json
{
    "name": "John Doe",
    "email": "john@example.com",
}
```
#   n o d e J s _ C r u d  
 