
import React, { useState } from 'react';

const CryptoCoinPredictor = () => {
  const [coinName, setCoinName] = useState('');
  const [prediction, setPrediction] = useState('');

  const handleInputChange = (event) => {
    setCoinName(event.target.value);
  };

  const handlePrediction = async () => {
    try {
      
      const response = await fetch(`https://api.example.com/predictions?coin=${coinName}`);
      const data = await response.json();

      if (response.ok) {
        setPrediction(`The predicted value for ${coinName} is ${data.prediction}`);
      } else {
        setPrediction('Failed to fetch prediction. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setPrediction('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h1>Crypto Coin Predictor</h1>
      <input
        type="text"
        placeholder="Enter coin name"
        value={coinName}
        onChange={handleInputChange}
      />
      <button onClick={handlePrediction}>Predict</button>
      {prediction && <p>{prediction}</p>}
    </div>
  );
};

export default CryptoCoinPredictor;
