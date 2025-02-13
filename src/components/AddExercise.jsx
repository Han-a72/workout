import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddExercise = () => {
  const [name, setName] = useState('');
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('');
  const [weight, setWeight] = useState('');
  const [isExerciseAdded, setIsExerciseAdded] = useState(false); // State to track if the exercise was added
  const navigate = useNavigate();

  const addExercise = async () => {
    if (!name || !reps || !sets || !weight) {
      alert('Please fill in all fields before adding.');
      return;
    }

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
      setIsExerciseAdded(true); // Mark the exercise as added
    } catch (error) {
      alert('Error adding exercise');
      console.error('Error details:', error.response);
    }
  };

  const goToViewExercises = () => {
    navigate('/view-exercises'); // Navigate to the View Exercises page
  };

  return (
    <div className="container mt-5" style={{ minHeight: '100vh' }}>
      <h2 className="text-center mb-4">Add New Exercise</h2>
      <div className="card shadow-lg p-4 rounded">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Exercise Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter exercise name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            />
          </div>
          <button
            type="button"
            className="btn btn-primary w-100 mb-3"
            onClick={addExercise}
          >
            Add Exercise
          </button>
        </form>

        {isExerciseAdded && (
          <div className="mt-3">
            <button
              className="btn btn-secondary w-100"
              onClick={goToViewExercises}
            >
              Go to View Exercises
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddExercise;
