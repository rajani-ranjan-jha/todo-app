# Todo App

A full-stack Todo application designed to demonstrate modern web development practices. This project is split into a client-side frontend and a server-side backend.

## Project Structure

The repository is organized into two main directories:

*   **`client/`**: Contains the frontend application code.
*   **`server/`**: Contains the backend API code.

## Prerequisites

Before running this project, ensure you have the following installed:

*   Node.js (v14 or higher recommended)
*   npm (Node Package Manager)

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### 1. Backend Setup (Server)

Navigate to the server directory, install dependencies, and start the server.

```bash
cd server

# Install dependencies
npm install

# Start the server (default port usually 3000 or 5000)
npm start
```

*Note: If the server requires environment variables (like a database connection string), please create a `.env` file in the `server/` directory based on the example provided in that folder.*

### 2. Frontend Setup (Client)

Open a new terminal window, navigate to the client directory, and start the frontend.

```bash
cd client

# Install dependencies
npm install

# Start the development server
npm start
```

The application should now be accessible in your browser (typically at `http://localhost:3000` or similar, depending on the framework used).

## Features

*   Create new tasks
*   View a list of pending and completed tasks
*   Update task status
*   Delete tasks

## Technologies Used

*   **Frontend:** [Insert Framework, e.g., React/Vue/Angular]
*   **Backend:** Node.js
*   **Database:** MySQL