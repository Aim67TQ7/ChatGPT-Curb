from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

def generate_report(evaluation_data, filename="full_report.pdf"):
    c = canvas.Canvas(filename, pagesize=letter)
    c.drawString(100, 750, f"Property Evaluation Report")
    c.drawString(100, 730, f"Score: {evaluation_data['score']}")
    c.drawString(100, 710, f"Observations: {evaluation_data['observations']}")
    c.drawString(100, 690, f"Recommendations: {evaluation_data['recommendations']}")
    c.save()
    return filename
