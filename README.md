# Curb Appeal Evaluation App

This project provides an API for evaluating the curb appeal of a property by uploading images and receiving an evaluation. It also integrates Stripe for payments, allowing users to purchase a detailed report based on the evaluation. The backend is built using **Flask** and the frontend is built with **React**.

## Features

- Upload property images and receive a curb appeal evaluation.
- Simulate interaction with an evaluation API (Anthropic or similar).
- Process payments via Stripe for generating detailed evaluation reports.
- Allow users to download the full report after payment.

## File Structure

curb-appeal/
├── backend/                      # Backend directory for Python code
│   ├── app.py                    # Main Flask app with routes for evaluating, payments, and report generation
│   ├── config.py                 # Configuration file for API keys and other settings (like Stripe, Anthropic)
│   ├── requirements.txt          # List of Python dependencies
│   ├── .env                      # Environment file for sensitive credentials (Stripe, Anthropic, etc.)
│   ├── uploads/                  # Directory for storing uploaded images and reports
│   ├── static/                   # Directory for static files (CSS, JS) for backend-based templates (if using Flask templates)
│   ├── templates/                # Directory for HTML templates (if using Flask to serve HTML)
│   └── utils/                    # Utility functions for file handling, report generation, etc.
│       ├── file_handler.py       # Helper functions for file processing (e.g., saving, deleting images)
│       └── report_generator.py   # Functions for generating PDF reports (e.g., for the full evaluation report)
├── frontend/                     # Frontend directory for React code
│   ├── public/                   # Public assets (index.html, etc.)
│   │   └── index.html            # Main HTML page (root)
│   ├── src/                      # React source files
│   │   ├── components/           # React components
│   │   │   ├── App.js            # Main React component for front-end logic
│   │   │   ├── Payment.js        # Payment component for Stripe integration
│   │   │   └── UploadForm.js     # Form for uploading images and entering property address
│   │   ├── services/             # Service functions for interacting with backend API
│   │   │   ├── api.js            # Functions to interact with backend API (e.g., image upload, payment processing)
│   │   └── App.css               # Styles for the React app
│   ├── package.json              # Frontend dependencies (React, Stripe, etc.)
│   └── .gitignore                # Frontend-specific gitignore
├── .gitignore                    # Main gitignore (includes backend & frontend files like .env and node_modules)
└── README.md                     # Project documentation (installation, setup, etc.)
# ChatGPT-Curb



## Backend (Flask API)

The backend is built using **Flask** and handles the following:

- **Image Upload and Evaluation**: Users can upload images for property evaluation, and the API returns a score, observations, and recommendations.
- **Stripe Payment Integration**: Allows users to pay for a detailed report.
- **Report Generation**: After payment, the backend generates a PDF report of the evaluation.

### Backend File Descriptions

- **`app.py`**: Main Flask application file with routes to handle image uploads, Stripe payment, and generating reports.
- **`config.py`**: Configuration file for storing environment variables such as API keys.
- **`requirements.txt`**: Python dependencies required for the backend (`Flask`, `stripe`, etc.).
- **`uploads/`**: Directory where uploaded images and generated reports are saved.
- **`utils/`**:
  - **`file_handler.py`**: Helper functions for file handling (saving, deleting images).
  - **`report_generator.py`**: Functions for generating the full PDF report after payment.

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/curb-appeal.git
   cd curb-appeal/backend
