# Todo Application Frontend

The frontend for the industrial-level Todo application built with vanilla HTML, CSS, and JavaScript.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Development](#development)
- [Deployment](#deployment)

## Overview

This is the frontend component of a full-stack Todo application. It provides a modern, responsive user interface for managing todos with advanced features like scheduling and time tracking.

## Features

- **Modern UI**: Clean, responsive design with smooth animations
- **Todo Management**: Create, read, update, and delete todos
- **Task Details**: Add descriptions and schedule tasks with due dates
- **Time Tracking**: Automatic calculation of task completion time
- **Real-time Updates**: Instant synchronization with backend API
- **Error Handling**: Comprehensive error management and user feedback
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Custom styling with animations and responsive design
- **JavaScript (ES6+)**: Client-side logic and interactivity
- **Fetch API**: Communication with backend REST API
- **Serve**: Lightweight static file server for development

## Project Structure

```
frontend/
├── index.html          # Main HTML file
├── styles.css          # Custom CSS styling
├── script.js           # Client-side JavaScript
├── package.json        # Project dependencies and scripts
└── README.md           # This file
```

## Setup and Installation

### Prerequisites
- Node.js (v16 or higher)
- npm (comes with Node.js)

### Installation Steps

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   or
   ```bash
   npx serve .
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Development

### File Descriptions

#### index.html
The main HTML file containing the structure of the application including:
- Navigation bar
- Todo creation form
- Todo list display
- Edit modal
- Footer
- Loading and error states

#### styles.css
Custom CSS file with:
- Responsive design using media queries
- Modern UI components with gradients and shadows
- Animations for smooth transitions
- Component-specific styling

#### script.js
Main JavaScript file implementing:
- API communication with backend
- DOM manipulation and event handling
- Todo CRUD operations
- Time calculations and formatting
- Modal management
- Error handling

### Key Functions

- `fetchTodos()`: Retrieve all todos from backend
- `createTodo()`: Create a new todo
- `updateTodo()`: Update an existing todo
- `deleteTodo()`: Delete a todo
- `openEditModal()`: Display edit form for a todo
- `renderTodoList()`: Render todos in the UI
- `showLoading()/hideLoading()`: Manage loading states
- `showError()`: Display error messages

## Deployment

### Production Deployment

To deploy the frontend:

1. Serve the files using any static file server:
   ```bash
   npx serve .
   ```

2. Or copy the files to any web server that can serve static files.

### Build Considerations

Since this is a vanilla HTML/CSS/JS application, no build step is required. Simply serve the files directly.

### Environment Variables

No environment variables are needed for the frontend as the backend URL is hardcoded in `script.js`.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the larger Todo Application and is licensed under the MIT License.