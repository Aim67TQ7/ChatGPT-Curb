import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = ({ setEvaluation }) => {
  const [image, setImage] = useState(null);
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle image change (file upload)
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle address input
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  // Submit the form (image + address)
  const handleSubmit = async () => {
    if (!image || !address) {
      alert('Please fill in both fields');
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('image', image);
    formData.append('address', address);

    try {
      const response = await axios.post('http://localhost:5000/evaluate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setEvaluation(response.data);  // Pass the evaluation data to the parent component
    } catch (error) {
      console.error('Error submitting data', error);
      alert('Error uploading the image');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="upload-form">
      <h2>Property Curb Appeal Evaluation</h2>
      <div>
        <input
          type="text"
          placeholder="Enter Property Address"
          value={address}
          onChange={handleAddressChange}
        />
      </div>
      <div>
        <input type="file" onChange={handleImageChange} />
      </div>
      <button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? 'Evaluating...' : 'Evaluate Property'}
      </button>
    </div>
  );
};

export default UploadForm;
