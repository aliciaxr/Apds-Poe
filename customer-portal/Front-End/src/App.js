import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Payment from './components/Payment';
import EmployeeLogin from './components/EmployeeLogin';
import EmployeeDashboard from './components/EmployeeDashboard';

function App() {
  const styles = {
    container: {
      maxWidth: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '30px',
      textAlign: 'center',
      backgroundColor: '#E0F2F1',  // A light green background, soothing and professional
      color: '#333',
    },
    heading: {
      color: '#204529',  // A darker green for contrast
      marginBottom: '10px',
      fontSize: '36px',
      fontWeight: 'bold',
    },
    paragraph: {
      fontSize: '18px',
      color: '#555',
      marginBottom: '20px',
    },
    navLink: {
      color: '#508D4E',  // A softer green for harmony
      textDecoration: 'none',
      margin: '0 15px',
      fontSize: '18px',
      fontWeight: '500',
      padding: '10px 20px',
      borderRadius: '5px',
      transition: 'background-color 0.3s, color 0.3s',
    },
    activeNavLink: {
      backgroundColor: '#508D4E',  // Green background for active state
      color: '#fff',
      textDecoration: 'underline',
    }
  };

  return (
    <Router>
      <div style={styles.container}>
        <h1 style={styles.heading}>Welcome to Our Portal</h1>
        <p style={styles.paragraph}>
          Navigate to:
          <NavLink to="/register" style={styles.navLink} activeStyle={styles.activeNavLink}> Register</NavLink>,
          <NavLink to="/login" style={styles.navLink} activeStyle={styles.activeNavLink}> Login</NavLink>,
          <NavLink to="/employee-login" style={styles.navLink} activeStyle={styles.activeNavLink}> Employee Login</NavLink>
        </p>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/employee-login" element={<EmployeeLogin />} />
          <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;