import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ user, setUser }) => {
    const navigate = useNavigate();

    const logoutHandler = () => {
        setUser(null);
        localStorage.removeItem('userInfo');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <h1>Chatbot</h1>
            {user && (
                <button onClick={logoutHandler} className="logout-button">
                    Logout
                </button>
            )}
        </nav>
    );
};

export default Navbar;
