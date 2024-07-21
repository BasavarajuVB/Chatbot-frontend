import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ setUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();

        const response = await fetch('https://chatbot-backend-x9vq.onrender.com/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate('/chat');
        } else {
            setError(data.message);
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            {error && <span className="error-message">{error}</span>}
            <form onSubmit={submitHandler}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
                <p>
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;