import React, { useState } from 'react';
import axios from 'axios';

function Payment() {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('');
  const [payeeAccount, setPayeeAccount] = useState('');
  const [swiftCode, setSwiftCode] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const token = localStorage.getItem('jwtToken');

      const response = await axios.post('http://localhost:5000/api/pay', {
        amount,
        currency,
        payeeAccount,
        swiftCode,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage('Payment processed successfully!');
    } catch (error) {
      setError(error.response?.data?.message || 'Payment failed. Please try again.');
    }
  };

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '50px auto',
      padding: '40px',  // Increased padding for more space inside the card
      backgroundColor: '#C4DAD2',
      borderRadius: '15px',
      border: '1px solid rgba(0, 0, 0, 0.1)', // Subtle border to define edges
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)', // Increased shadow for more depth
    },
    heading: {
      color: '#508D4E',
      marginBottom: '20px',
    },
    input: {
      width: '100%',
      padding: '12px',
      margin: '12px 0',
      borderRadius: '8px',
      border: '1px solid #ccc',
      fontSize: '16px',
    },
    button: {
      backgroundColor: '#508D4E',
      color: '#fff',
      padding: '12px',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      cursor: 'pointer',
      width: '100%',
    },
    message: {
      color: 'green',
    },
    error: {
      color: 'red',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Payment Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Payee Account"
          value={payeeAccount}
          onChange={(e) => setPayeeAccount(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="SWIFT Code"
          value={swiftCode}
          onChange={(e) => setSwiftCode(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Pay</button>

        {message && <p style={styles.message}>{message}</p>}
        {error && <p style={styles.error}>{error}</p>}
      </form>
    </div>
  );
}

export default Payment;
