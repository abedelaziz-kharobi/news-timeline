# News Timeline

This project implements a simple web application that displays urgent news items in a timeline format. It utilizes Docker for containerization, Flask for the backend API, MySQL for the database, and Nginx for serving the frontend.

## Features

- **Backend (Flask):**
  - Provides a REST API (`/getUrgentNews`) to fetch the latest news items from MySQL.
  - Handles CORS using Flask-CORS for seamless frontend-backend communication.
  
- **Frontend (Nginx):**
  - Displays news items fetched from the backend in a dynamic timeline format.
  - Implemented in HTML, JavaScript (ES6), and CSS with responsive design.

- **Database (MySQL):**
  - Stores news items with fields for title and content.
  - Initialized with sample data using Docker Compose.

## Prerequisites

Ensure you have Docker and Docker Compose installed on your machine.

## Getting Started

1. Clone this repository:
   ```bash
   git clone https://github.com/abedelaziz-kharobi/news-timeline.git
   cd news-timeline

2. Build and run the Docker containers:
   ```bash
   docker-compose up
   
3. Access the application:
   - Backend API: http://localhost:5000/getUrgentNews
   - Frontend UI: http://localhost:8080

## Directory Structure
```
.
├── backend/ 
│   ├── app.py            # Flask backend implementation
│   ├── Dockerfile        # Dockerfile for Flask backend
│   └── requirements.txt  # Python dependencies
│
├── frontend/
│   ├── Dockerfile        # Dockerfile for Nginx frontend
│   ├── index.html        # HTML structure for news timeline
│   ├── script.js         # JavaScript for fetching and rendering news
│   └── styles.css        # CSS styles for the frontend
│
├── MySQL/
│   ├── Dockerfile        # Dockerfile for MySQL database
│   └── setup.sql         # SQL script to initialize database and data
│
├── docker-compose.yml    # Docker Compose configuration file
└── README.md             # This file, project overview and setup guide
```
## Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your improvements.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
    
  
