import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import './App.css';

// Configure axios defaults
axios.defaults.baseURL = process.env.REACT_APP_API_URL || '';
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function App() {
  const [currentView, setCurrentView] = useState('login');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.get('/api/auth/profile');
        setUser(response.data.user);
        setCurrentView('dashboard');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (userData, token) => {
    setUser(userData);
    localStorage.setItem('token', token);
    setCurrentView('dashboard');
    setError('');
  };

  const handleRegister = (userData, token) => {
    setUser(userData);
    localStorage.setItem('token', token);
    setCurrentView('dashboard');
    setError('');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    setCurrentView('login');
    setError('');
  };

  const showError = (message) => {
    setError(message);
    setTimeout(() => setError(''), 5000);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="container">
        {error && (
          <div className="error-message global-error">
            {error}
            <button onClick={() => setError('')} className="close-error">×</button>
          </div>
        )}
        
        {currentView === 'login' && (
          <Login 
            onLogin={handleLogin}
            onSwitchToRegister={() => setCurrentView('register')}
            onError={showError}
          />
        )}
        
        {currentView === 'register' && (
          <Register 
            onRegister={handleRegister}
            onSwitchToLogin={() => setCurrentView('login')}
            onError={showError}
          />
        )}
        
        {currentView === 'dashboard' && user && (
          <Dashboard user={user} onLogout={handleLogout} />
        )}
      </div>
    </div>
  );
}

export default App;