import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [accountNumber, setAccountNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (accountNumber.length !== 10) {
      setError('Account Number must be exactly 10 digits.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/customers/login', {
        accountNumber,
        password,
      });
      const { token } = response.data;
      localStorage.setItem('jwtToken', token);
      navigate('/payment');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
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
    buttonDisabled: {
      backgroundColor: '#ccc',
      cursor: 'not-allowed',
    },
    message: {
      color: 'red',
      marginTop: '10px',
    },
    loading: {
      fontSize: '16px',
      color: '#508D4E',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
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
        <button
          type="submit"
          style={{ 
            ...styles.button, 
            ...(loading ? styles.buttonDisabled : {}) 
          }} 
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {loading && <p style={styles.loading}>Loading...</p>}
        {error && <p style={styles.message}>{error}</p>}
      </form>
    </div>
  );
}

export default Login;
