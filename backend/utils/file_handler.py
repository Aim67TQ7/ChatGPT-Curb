import os
from werkzeug.utils import secure_filename

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def save_image(image):
    if image and allowed_file(image.filename):
        filename = secure_filename(image.filename)
        image_path = os.path.join('uploads', filename)
        image.save(image_path)
        return image_path
    else:
        raise Exception("Invalid file type")

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
