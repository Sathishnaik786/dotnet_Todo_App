# Todo Application Backend

The backend for the industrial-level Todo application built with .NET 8 Web API.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Development](#development)
- [Deployment](#deployment)

## Overview

This is the backend component of a full-stack Todo application. It provides a RESTful API for managing todos with MongoDB as the data store.

## Features

- **RESTful API**: Clean and consistent API endpoints
- **MongoDB Integration**: NoSQL database for flexible data storage
- **Clean Architecture**: Separation of concerns with repository pattern
- **Comprehensive Error Handling**: Structured error responses
- **Data Validation**: Input validation and sanitization
- **CORS Support**: Cross-origin resource sharing enabled

## Technologies Used

- **.NET 8**: Web API framework
- **C#**: Programming language
- **MongoDB**: NoSQL database
- **MongoDB.Driver**: Official MongoDB driver for .NET
- **Swagger/OpenAPI**: API documentation (development only)

## Project Structure

```
backend/
├── Controllers/
│   └── TodoController.cs          # API endpoints
├── DTOs/
│   ├── CreateTodoDto.cs           # Data transfer object for creation
│   └── UpdateTodoDto.cs           # Data transfer object for updates
├── Models/
│   └── Todo.cs                    # Todo entity model
├── Repositories/
│   ├── ITodoRepository.cs         # Repository interface
│   └── TodoRepository.cs          # Repository implementation
├── Services/
│   └── TodoService.cs             # Business logic
├── Utils/
│   └── ApiResponse.cs             # Standardized API responses
├── Program.cs                     # Application entry point
├── TodoApi.csproj                 # Project configuration
└── appsettings.json               # Configuration settings
```

## Setup and Installation

### Prerequisites
- .NET 8 SDK
- MongoDB (local instance or cloud)

### Installation Steps

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Restore NuGet packages:
   ```bash
   dotnet restore
   ```

3. Update MongoDB connection in `appsettings.json`:
   ```json
   {
     "MongoDB": {
       "ConnectionString": "mongodb://localhost:27017",
       "DatabaseName": "TodoDb",
       "CollectionName": "Todos"
     }
   }
   ```

4. Run the application:
   ```bash
   dotnet run
   ```

5. The API will be available at `http://localhost:5000`

## API Documentation

When running in development mode, Swagger documentation is available at:
`http://localhost:5000/swagger`

### Endpoints

#### Get all todos
```
GET /api/todo
```

#### Get a specific todo
```
GET /api/todo/{id}
```

#### Create a new todo
```
POST /api/todo
```
Request Body:
```json
{
  "name": "string",
  "description": "string",
  "allocationTime": "datetime (optional)"
}
```

#### Update a todo
```
PUT /api/todo/{id}
```
Request Body:
```json
{
  "name": "string (optional)",
  "description": "string (optional)",
  "isComplete": "boolean (optional)",
  "allocationTime": "datetime (optional)"
}
```

#### Delete a todo
```
DELETE /api/todo/{id}
```

## Database Schema

### Todos Collection
```javascript
{
  "_id": ObjectId,
  "Name": String,
  "Description": String,
  "IsComplete": Boolean,
  "AllocationTime": DateTime (nullable),
  "CreatedAt": DateTime,
  "UpdatedAt": DateTime
}
```

## Development

### Architecture

The backend follows Clean Architecture principles:
- **Controllers**: Handle HTTP requests and responses
- **Services**: Implement business logic
- **Repositories**: Handle data persistence
- **DTOs**: Data transfer objects for API contracts
- **Models**: Domain entities

### Key Components

#### TodoController
Handles all HTTP requests for todo operations with proper error handling and response formatting.

#### TodoService
Implements business logic including data validation and coordination between controllers and repositories.

#### TodoRepository
Abstracts data access operations using the MongoDB.Driver package.

#### ApiResponse
Standardizes API responses with success/failure indicators and consistent structure.

### Error Handling
All endpoints return structured error responses with appropriate HTTP status codes.

## Deployment

### Publishing
```bash
dotnet publish -c Release -o ./publish
```

### Deployment Options

1. **Self-contained deployment**:
   ```bash
   dotnet publish -c Release -r win-x64 --self-contained true -p:PublishSingleFile=true
   ```

2. **Framework-dependent deployment**:
   ```bash
   dotnet publish -c Release
   ```

### Environment Variables
Set the following environment variables in production:
```bash
MONGODB_CONNECTION_STRING=mongodb://your-mongodb-uri
ASPNETCORE_ENVIRONMENT=Production
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the larger Todo Application and is licensed under the MIT License.