import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
  const [image, setImage] = useState(null);
  const [address, setAddress] = useState('');
  const [evaluation, setEvaluation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

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
      setEvaluation(response.data);
    } catch (error) {
      console.error('Error submitting data', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Property Address"
        value={address}
        onChange={handleAddressChange}
      />
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? 'Evaluating...' : 'Evaluate
