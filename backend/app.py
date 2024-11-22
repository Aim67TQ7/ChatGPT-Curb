import os
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import stripe
from werkzeug.utils import secure_filename
from utils.file_handler import save_image
from utils.report_generator import generate_report

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing for React frontend

# Load environment variables from .env
app.config['UPLOAD_FOLDER'] = 'uploads/'
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg', 'gif'}
app.config['STRIPE_SECRET_KEY'] = os.getenv("STRIPE_SECRET_KEY")
stripe.api_key = app.config['STRIPE_SECRET_KEY']

# Configure file upload settings
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

# Function to check allowed file types
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Route to handle image upload and evaluation
@app.route('/evaluate', methods=['POST'])
def evaluate_property():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file part'}), 400
    image = request.files['image']
    address = request.form['address']

    if image.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if image and allowed_file(image.filename):
        # Save the image to the server
        filename = secure_filename(image.filename)
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        image.save(image_path)

        # Simulate property evaluation (you'll call the Anthropic API here)
        # Example response (replace with your Anthropic API interaction):
        evaluation = {
            "score": 85,
            "observations": "Well-maintained lawn, clean driveway.",
            "recommendations": "Add more flowers and shrubs in front."
        }

        # Return evaluation summary
        return jsonify(evaluation)

    return jsonify({'error': 'Invalid file type'}), 400

# Route to handle Stripe payment
@app.route('/charge', methods=['POST'])
def charge_payment():
    try:
        # Extract payment token from frontend
        token = request.json.get('token')
        amount = request.json.get('amount')

        # Create Stripe payment intent
        payment_intent = stripe.PaymentIntent.create(
            amount=amount,
            currency='usd',
            payment_method=token,
            confirmation_method='manual',
            confirm=True
        )

        # Check if payment was successful
        if payment_intent.status == 'succeeded':
            return jsonify({'success': True})
        else:
            return jsonify({'error': 'Payment failed.'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Route to handle full report download
@app.route('/download-report/<filename>', methods=['GET'])
def download_report(filename):
    try:
        # Ensure the file exists before downloading
        report_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        if os.path.exists(report_path):
            return send_file(report_path, as_attachment=True)
        else:
            return jsonify({'error': 'File not found.'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Helper function to generate a PDF report (after payment)
@app.route('/generate-full-report', methods=['POST'])
def generate_full_report():
    evaluation_data = request.json

    try:
        # Generate a detailed report PDF
        filename = generate_report(evaluation_data)
        return jsonify({'reportUrl': f'/download-report/{filename}'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    # Create the uploads folder if it doesn't exist
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])
    
    app.run(debug=True, host='0.0.0.0', port=5000)
