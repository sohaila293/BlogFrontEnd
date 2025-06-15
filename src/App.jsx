import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './Pages/Navbar';
import LoginForm from './Pages/Login';
import RegisterForm from './Pages/Register';
import ErrorPage from './Pages/ErrorPage';
import BlogPage from './Pages/BlogPage';
import CreatePost from '../src/Pages/CreatePost'; 
import EditPost from '../src/Pages/EditPost';
import axios from 'axios';

const App = () => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(res.data);
      }
    };
    getUser();
  }, []);

  return (
    <Router>
      <Navbar user={ user } setUser={ setUser } />
      <Routes>
        <Route path="/" element={<BlogPage user={ user } />} />
        <Route path="/register" element={<RegisterForm setUser={setUser} />} />
        <Route path="/login" element={<LoginForm setUser={setUser} />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/edit/:id" element={<EditPost user={user} />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<Navigate to="/register" />} />
      </Routes>
    </Router>
  );
};

export default App;
