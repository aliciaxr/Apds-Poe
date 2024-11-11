import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [fullName, setFullName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/customers/register', {
        fullName,
        idNumber,
        accountNumber,
        password,
      });

      if (response && response.data) {
        setMessage(response.data.message);
      } else {
        setError('Unexpected response format');
      }

      setFullName('');
      setIdNumber('');
      setAccountNumber('');
      setPassword('');
    } catch (error) {
      setError(
        error.response?.data?.errors?.map((err) => err.msg).join(', ') ||
        'An unexpected error occurred. Please try again.'
      );
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
      <h2 style={styles.heading}>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="ID Number"
          value={idNumber}
          onChange={(e) => setIdNumber(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Account Number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Register</button>

        {message && <p style={styles.message}>{message}</p>}
        {error && <p style={styles.error}>{error}</p>}
      </form>
    </div>
  );
}

export default Register;
