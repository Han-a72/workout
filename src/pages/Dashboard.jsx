import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [exerciseData, setExerciseData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      // Fetch user data and exercise data when the component mounts
      axios
        .get('http://localhost:5000/api/user', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });

      axios
        .get('https://workout-1-t3lv.onrender.com/api/exercises', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setExerciseData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching exercises:', error);
        });
    }
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Dashboard</h2>

      {userData ? (
        <div className="card shadow-lg p-4 rounded mb-4">
          <h4>Welcome, {userData.username}!</h4>
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        <div>Loading user data...</div>
      )}

      <div className="card shadow-lg p-4 rounded mb-4">
        <h5>Recent Workouts</h5>
        <ul className="list-group">
          {exerciseData.length === 0 ? (
            <li className="list-group-item">No workouts found.</li>
          ) : (
            exerciseData.slice(0, 5).map((exercise) => (
              <li key={exercise._id} className="list-group-item">
                <h6>{exercise.name}</h6>
                <p>Reps: {exercise.reps}</p>
                <p>Sets: {exercise.sets}</p>
                <p>Weight: {exercise.weight} kg</p>
              </li>
            ))
          )}
        </ul>
        <Link to="/view-exercises" className="btn btn-primary mt-3 w-100">
          View All Exercises
        </Link>
      </div>

      <div className="card shadow-lg p-4 rounded mb-4">
        <h5>Quick Links</h5>
        <div className="d-flex justify-content-between">
          <Link to="/addexercise" className="btn btn-success w-45">
            Add Exercise
          </Link>
          <Link to="/view-exercises" className="btn btn-info w-45">
            View Exercises
          </Link>
        </div>
      </div>

      <div className="card shadow-lg p-4 rounded mb-4">
        <h5>Motivation</h5>
        <p>"Push yourself, because no one else is going to do it for you."</p>
      </div>
    </div>
  );
};

export default Dashboard;
