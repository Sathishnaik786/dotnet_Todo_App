# Industrial-Level Todo Application

A full-stack Todo application with advanced features including task scheduling, time tracking, and comprehensive CRUD operations. Built with modern technologies following industry best practices.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- ✅ **Full CRUD Operations**: Create, Read, Update, Delete todos
- 📝 **Rich Todo Management**: Title, description, and scheduling
- ⏰ **Time Tracking**: Automatic calculation of completion time
- 📅 **Allocation Time**: Schedule tasks with due dates
- ✨ **Modern UI**: Responsive design with smooth animations
- 🔄 **Real-time Updates**: Instant synchronization with backend
- 🛡️ **Error Handling**: Comprehensive error management
- 📱 **Mobile Responsive**: Works on all device sizes

## Tech Stack

### Frontend
- **HTML5** - Markup language
- **CSS3** - Styling and animations
- **JavaScript (ES6+)** - Client-side logic
- **Fetch API** - HTTP client for API communication

### Backend
- **.NET 8** - Web API framework
- **C#** - Programming language
- **MongoDB** - NoSQL database
- **Clean Architecture** - Separation of concerns
- **Repository Pattern** - Data access abstraction

### Database
- **MongoDB** - Document-based NoSQL database

### Development Tools
- **Visual Studio Code** - Code editor
- **Git** - Version control
- **npm** - Package manager
- **serve** - Static file server

## Project Structure

```
todoapp/
├── backend/
│   ├── Controllers/
│   │   └── TodoController.cs          # API endpoints
│   ├── DTOs/
│   │   ├── CreateTodoDto.cs           # Data transfer object for creation
│   │   └── UpdateTodoDto.cs           # Data transfer object for updates
│   ├── Models/
│   │   └── Todo.cs                    # Todo entity model
│   ├── Repositories/
│   │   ├── ITodoRepository.cs         # Repository interface
│   │   └── TodoRepository.cs          # Repository implementation
│   ├── Services/
│   │   └── TodoService.cs             # Business logic
│   ├── Utils/
│   │   └── ApiResponse.cs             # Standardized API responses
│   ├── Program.cs                     # Application entry point
│   ├── TodoApi.csproj                 # Project configuration
│   └── appsettings.json               # Configuration settings
├── frontend/
│   ├── index.html                     # Main HTML file
│   ├── styles.css                     # Custom CSS styling
│   ├── script.js                      # Client-side JavaScript
│   ├── package.json                   # Frontend dependencies
│   └── README.md                      # Frontend documentation
├── .gitignore                         # Git ignored files
└── README.md                          # Project documentation
```

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **.NET 8 SDK** 
- **MongoDB** (local instance or cloud)
- **Git** (optional, for version control)

### Installing Prerequisites

#### Node.js
Download and install Node.js from [nodejs.org](https://nodejs.org/)

#### .NET 8 SDK
Download and install .NET 8 SDK from [dotnet.microsoft.com](https://dotnet.microsoft.com/download/dotnet/8.0)

#### MongoDB
You can either:
1. Install MongoDB locally from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Use MongoDB Atlas (cloud) - [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd todoapp
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

3. **Restore backend dependencies**
   ```bash
   cd backend
   dotnet restore
   cd ..
   ```

4. **Configure MongoDB connection**
   Update the `backend/appsettings.json` file with your MongoDB connection string:
   ```json
   {
     "MongoDB": {
       "ConnectionString": "mongodb://localhost:27017",
       "DatabaseName": "TodoDb",
       "CollectionName": "Todos"
     },
     "Logging": {
       "LogLevel": {
         "Default": "Information",
         "Microsoft.AspNetCore": "Warning"
       }
     },
     "AllowedHosts": "*"
   }
   ```

## Running the Application

### Start the Backend Server
```bash
cd backend
dotnet run
```
The backend API will be available at `http://localhost:5000`

### Start the Frontend Server
In a new terminal:
```bash
cd frontend
npx serve .
```
The frontend will be available at `http://localhost:3000`

### Access the Application
Open your browser and navigate to `http://localhost:3000`

## API Endpoints

### Todo Endpoints
| Method | Endpoint         | Description           |
|--------|------------------|-----------------------|
| GET    | `/api/todo`      | Get all todos         |
| POST   | `/api/todo`      | Create a new todo     |
| GET    | `/api/todo/{id}` | Get a specific todo   |
| PUT    | `/api/todo/{id}` | Update a todo         |
| DELETE | `/api/todo/{id}` | Delete a todo         |

### Todo Object Structure
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "isComplete": "boolean",
  "allocationTime": "datetime (nullable)",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
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

### Backend Development
The backend follows Clean Architecture principles with:
- **Controllers**: Handle HTTP requests
- **Services**: Implement business logic
- **Repositories**: Handle data access
- **DTOs**: Data transfer objects
- **Models**: Domain entities

### Frontend Development
The frontend is built with vanilla JavaScript and includes:
- **Modular Code**: Organized functions and event handlers
- **Responsive Design**: Mobile-first approach
- **Error Handling**: Graceful error management
- **Loading States**: Visual feedback during operations

### Code Quality
- Consistent naming conventions
- Proper error handling
- Clean, readable code
- Well-documented functions

## Building for Production

### Frontend Build
The frontend is served statically and doesn't require a build step.

### Backend Build
```bash
cd backend
dotnet publish -c Release -o ./publish
```

## Deployment

### Backend Deployment Options
1. **Self-contained deployment**:
   ```bash
   dotnet publish -c Release -r win-x64 --self-contained true -p:PublishSingleFile=true
   ```

2. **Framework-dependent deployment**:
   ```bash
   dotnet publish -c Release
   ```

### Frontend Deployment
Simply serve the frontend files using any static file server:
```bash
cd frontend
npx serve .
```

### Environment Variables
Set the following environment variables in production:
```bash
MONGODB_CONNECTION_STRING=mongodb://your-mongodb-uri
ASPNETCORE_ENVIRONMENT=Production
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Happy Coding!** 🚀