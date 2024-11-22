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
