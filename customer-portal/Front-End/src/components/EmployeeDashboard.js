import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EmployeeDashboard() {
    const [transactions, setTransactions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            navigate('/employee-login');
            return;
        }

        const fetchTransactions = async () => {
            const response = await fetch('http://localhost:5000/api/transactions', {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                },
            });
            const data = await response.json();
            setTransactions(data.map(transaction => ({
                ...transaction,
                isVerifying: false,
                submitted: transaction.status === 'submitted' // Set submitted if status is already submitted
            })));
        };

        fetchTransactions();
    }, [navigate]);

    const handleVerify = (transactionId) => {
        setTransactions(transactions.map(transaction =>
            transaction._id === transactionId
                ? { ...transaction, isVerifying: true }
                : transaction
        ));
    };

    const handleSubmitVerification = (transactionId) => {
        // Update the transaction to submitted in the frontend state
        setTransactions(transactions.map(transaction =>
            transaction._id === transactionId
                ? { ...transaction, isVerifying: false, submitted: true }
                : transaction
        ));
        
        // Optionally, send an update to the backend to mark the transaction as submitted
        fetch(`http://localhost:5000/api/transactions/verify/${transactionId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 'submitted' })
        });
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ width: '90%', maxWidth: '1000px' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Employee Dashboard</h1>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f0f0f0', textAlign: 'left' }}>
                            <th style={{ padding: '8px' }}>Amount</th>
                            <th style={{ padding: '8px' }}>Currency</th>
                            <th style={{ padding: '8px' }}>Payee Account</th>
                            <th style={{ padding: '8px' }}>SWIFT Code</th>
                            <th style={{ padding: '8px' }}>Status</th>
                            <th style={{ padding: '8px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction._id}>
                                <td style={{ padding: '8px' }}>{transaction.amount}</td>
                                <td style={{ padding: '8px' }}>{transaction.currency}</td>
                                <td style={{ padding: '8px' }}>{transaction.payeeAccount}</td>
                                <td style={{ padding: '8px' }}>{transaction.swiftCode}</td>
                                <td style={{ padding: '8px' }}>{transaction.submitted ? 'submitted' : (transaction.isVerifying ? 'verifying' : transaction.status)}</td>
                                <td style={{ padding: '8px' }}>
                                    {!transaction.isVerifying && !transaction.submitted && (
                                        <button
                                            onClick={() => handleVerify(transaction._id)}
                                            style={{ backgroundColor: 'green', color: 'white', marginRight: '8px' }}
                                        >
                                            Verify
                                        </button>
                                    )}
                                    {transaction.isVerifying && (
                                        <button
                                            onClick={() => handleSubmitVerification(transaction._id)}
                                            style={{ backgroundColor: 'blue', color: 'white' }}
                                        >
                                            Submit
                                        </button>
                                    )}
                                    {transaction.submitted && (
                                        <span style={{ color: 'green', fontWeight: 'bold' }}>
                                            Submitted to SWIFT
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default EmployeeDashboard;
