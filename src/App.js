
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Chatbot from './components/Chatbot';
import Navbar from './components/Navbar';
import './App.css';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo) setUser(userInfo);
    }, []);

    return (
        <Router>
            <div className="App">
                <Navbar user={user} setUser={setUser} />
                <Routes>
                    <Route
                        path="/login"
                        element={user ? <Navigate to="/chat" /> : <Login setUser={setUser} />}
                    />
                    <Route
                        path="/register"
                        element={user ? <Navigate to="/chat" /> : <Register setUser={setUser} />}
                    />
                    <Route
                        path="/chat"
                        element={user ? <Chatbot user={user} /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/"
                        element={<Navigate to="/login" />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
