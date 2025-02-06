import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaDumbbell, FaListOl, FaWeightHanging } from 'react-icons/fa'; // For icons

const ViewExercises = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      axios
        .get('http://localhost:5000/api/exercises', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setExercises(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError('Error fetching exercises');
          setLoading(false);
        });
    } else {
      setError('Please log in first');
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">View Exercises</h2>
      <div className="card shadow-lg p-4 rounded">
        <div className="row">
          {exercises.length === 0 ? (
            <div className="col-12">
              <div className="alert alert-info">No exercises found</div>
            </div>
          ) : (
            exercises.map((exercise) => (
              <div key={exercise._id} className="col-12 col-md-6 col-lg-4 mb-4">
                <div className="card shadow-lg p-3 rounded">
                  <div className="card-body">
                    <h5 className="card-title text-center">{exercise.name}</h5>
                    <div className="d-flex justify-content-between">
                      <div className="exercise-info">
                        <FaListOl size={24} /> <span>Reps: {exercise.reps}</span>
                      </div>
                      <div className="exercise-info">
                        <FaDumbbell size={24} /> <span>Sets: {exercise.sets}</span>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mt-2">
                      <div className="exercise-info">
                        <FaWeightHanging size={24} /> <span>Weight: {exercise.weight} kg</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewExercises;
