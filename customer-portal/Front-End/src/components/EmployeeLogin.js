import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Use axios for consistency with the other form

function EmployeeLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Styles
    const styles = {
        container: {
            maxWidth: '600px',
            margin: '50px auto',
            padding: '40px',
            backgroundColor: '#C4DAD2',
            borderRadius: '15px',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
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

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!username || !password) {
            setError('Please fill in all fields');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/employee/login', {
                username,
                password,
            });
            const { token } = response.data;
            localStorage.setItem('authToken', token);
            navigate('/employee-dashboard');
        } catch (error) {
            setError(error.response?.data?.message || 'Invalid credentials');
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Employee Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                    style={styles.input}
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
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

export default EmployeeLogin;