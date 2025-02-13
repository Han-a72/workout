import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddExercise from './components/AddExercise';
import NavBar from './components/NavBar';
import ViewExercises from './pages/ViewExercises';

function App() {
  const token = localStorage.getItem('token'); // Get token from localStorage

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protecting the dashboard route */}
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Login />} // If no token, redirect to login
        />
        
        {/* Redirect to login by default if not authenticated */}
        <Route path="/" element={<Register />} />
        <Route path="/addexercise" element={<AddExercise />} />
        <Route path="/view-exercises" element={<ViewExercises />} />
        </Routes>
    </Router>
  );
}

export default App;
