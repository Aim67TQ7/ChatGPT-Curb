import React, { useState } from 'react';
import UploadForm from './UploadForm';
import Payment from './Payment';
import './App.css';

const App = () => {
  const [evaluation, setEvaluation] = useState(null);
  const [isPaid, setIsPaid] = useState(false);

  const handleEvaluation = (data) => {
    setEvaluation(data);
  };

  const handlePaymentSuccess = () => {
    setIsPaid(true);
  };

  return (
    <div className="app-container">
      <h1>Property Curb Appeal Evaluation</h1>

      {/* Upload Form */}
      {!evaluation && !isPaid && <UploadForm setEvaluation={handleEvaluation} />}

      {/* Display Evaluation */}
      {evaluation && !isPaid && (
        <div className="evaluation-summary">
          <h3>Evaluation Summary</h3>
          <p>Score: {evaluation.score}</p>
          <p>Observations: {evaluation.observations}</p>
          <p>Recommendations: {evaluation.recommendations}</p>
          
          {/* Payment Component */}
          <Payment amount={7.99} onSuccess={handlePaymentSuccess} />
        </div>
      )}

      {/* Show full report download link after payment */}
      {isPaid && evaluation && (
        <div>
          <h3>Full Report</h3>
          <a href={`http://localhost:5000/download-report/full_report.pdf`} download>
            Download Full Report
          </a>
        </div>
      )}
    </div>
  );
};

export default App;
