import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Dealers from './components/Dealers/Dealers';
import Dealer from './components/Dealer/Dealer';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import PostReview from './components/PostReview/PostReview';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('userName');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogin = (userName) => {
    localStorage.setItem('userName', userName);
    setUser(userName);
  };

  const handleLogout = () => {
    localStorage.removeItem('userName');
    setUser(null);
    fetch('/djangoapp/logout', { credentials: 'include' });
  };

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <div className="App">
      <Header user={user} onLogout={handleLogout} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dealers" element={<Dealers user={user} />} />
          <Route path="/dealer/:id" element={<Dealer />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onLogin={handleLogin} />} />
          <Route
            path="/postreview/:id"
            element={
              <ProtectedRoute>
                <PostReview user={user} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;