# Capitalia

Capitalia is a web platform developed as part of a Software Engineering project.  
It consists of a Python backend that manages the database and exposes an API, and a React frontend that provides the user interface.

## Overview

The system is designed as a client–server architecture:

- The **backend** is written in Python and acts as the data layer.  
  It handles connections to the database, authentication, and API endpoints.  
  The backend runs on **port 3001**.

- The **frontend** is a React application.  
  It communicates with the backend via HTTP requests to the exposed API.  
  The frontend is started separately and runs on its own development server (for example, Vite or Create React App).

```
[React Frontend]  →  http://localhost:5173
      ↓ REST API
[Python Backend + Database]  →  http://localhost:3001
```

## How to Run the Project

1. **Start the backend**

   Open a terminal in the backend folder and run:

   ```bash
   json-server --watch db.json --port 3001
   ```

   This will start the JSON server and open the database connection on port `3001`.

2. **Start the frontend**

   In another terminal, move to the React project directory and run:

   ```bash
   npm install
   npm run dev
   ```

   The React application will start on its development port (usually `5173`).

3. **Access the application**

   Open your browser and visit:

   ```
   http://localhost:5173
   ```

   The frontend will automatically communicate with the backend through the API on port `3001`.

## Summary

- JSON sevrer backend exposes the database and API on **port 3001**  
- React frontend runs as a separate client application  
- Communication happens through HTTP requests between React and Python servers  
- Both components must be running simultaneously for the full system to work
