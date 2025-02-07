import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate

const AddExercise = () => {
  const [name, setName] = useState('');
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('');
  const [weight, setWeight] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      alert('No token found, please login first');
      return;
    }

    try {
      await axios.post(
        'https://workout-1-t3lv.onrender.com/api/exercises',
        { name, reps, sets, weight },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Exercise added successfully');
      
      // Reset form fields
      setName('');
      setReps('');
      setSets('');
      setWeight('');

      // Navigate to the ViewExercises page
      navigate('/view-exercises');
    } catch (error) {
      alert('Error adding exercise');
      console.error('Error details:', error.response);
    }
  };

  return (
    <div className="container mt-5" style={{  minHeight: '100vh' }}>
      <h2 className="text-center mb-4" style={{ color: '#343a40' }}>Add New Exercise</h2>
      <div className="card shadow-lg p-4 rounded" style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: '#ffffff' }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Exercise Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter exercise name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ borderRadius: '0.375rem' }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="reps" className="form-label">Reps</label>
            <input
              type="number"
              className="form-control"
              id="reps"
              placeholder="Enter number of reps"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              style={{ borderRadius: '0.375rem' }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="sets" className="form-label">Sets</label>
            <input
              type="number"
              className="form-control"
              id="sets"
              placeholder="Enter number of sets"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
              style={{ borderRadius: '0.375rem' }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="weight" className="form-label">Weight (kg)</label>
            <input
              type="number"
              className="form-control"
              id="weight"
              placeholder="Enter weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              style={{ borderRadius: '0.375rem' }}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" style={{ borderRadius: '0.375rem' }}>Add Exercise</button>
        </form>
      </div>
    </div>
  );
};

export default AddExercise;
