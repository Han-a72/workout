import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash, FaWeight, FaStopwatch, FaList } from 'react-icons/fa';

const ViewExercises = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExercises = async () => {
      const token = localStorage.getItem('token'); // Get token from localStorage
      if (!token) {
        setError('No token found. Please login again.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`https://workout-1-t3lv.onrender.com/api/exercises`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Fetched Exercises:', response.data); // Log the response
        setExercises(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Fetch Error:', err); // Log the error
        setError('Error fetching exercises');
        setLoading(false);
      }
    };
    fetchExercises();
  }, []);

  const deleteExercise = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`https://workout-1-t3lv.onrender.com/api/exercises/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExercises(exercises.filter((exercise) => exercise._id !== id));
    } catch (error) {
      alert('Error deleting exercise');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">View Exercises</h2>
      {exercises.length === 0 ? (
        <div className="alert alert-info">No exercises found</div>
      ) : (
        <div className="row">
          {exercises.map((exercise) => (
            <div key={exercise._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{exercise.name}</h5>
                  <p>
                    <FaStopwatch className="me-2" /> {exercise.reps} reps
                  </p>
                  <p>
                    <FaList className="me-2" /> {exercise.sets} sets
                  </p>
                  <p>
                    <FaWeight className="me-2" /> {exercise.weight} kg
                  </p>
                  <button
                    className="btn btn-danger d-flex align-items-center"
                    onClick={() => deleteExercise(exercise._id)}
                  >
                    <FaTrash className="me-2" /> Delete {/* Added trash icon */}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewExercises;
