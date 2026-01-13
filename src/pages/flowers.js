import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './flowers.css';

const Flowers = () => {
  const [flowers, setFlowers] = useState([]);

  const backendURL = process.env.REACT_APP_API_URL || 'https://flower-app-jp7a.onrender.com';

  useEffect(() => {
    const fetchFlowers = async () => {
      try {
        const res = await axios.get(`${backendURL}/api/flowers`, { withCredentials: true });
        setFlowers(res.data);
      } catch (err) {
        console.error('Error fetching flowers:', err);
      }
    };

    fetchFlowers();
  }, [backendURL]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this flower?')) {
      try {
        await axios.delete(`${backendURL}/api/flowers/${id}`, { withCredentials: true });
        const res = await axios.get(`${backendURL}/api/flowers`, { withCredentials: true });
        setFlowers(res.data);
      } catch (error) {
        console.error('Error deleting flower:', error);
      }
    }
  };

  return (
    <div className="flower-container">
      <h1 className="flower-title">Flowers</h1>
      <div className="flower-grid">
        {flowers.map((flower) => {
          const imageUrl = flower.image?.startsWith('http')
            ? flower.image
            : `${backendURL}${flower.image}`;

          return (
            <div className="flower-card" key={flower._id}>
              <img
                src={imageUrl}
                className="flower-image"
                alt={flower.name}
              />
              <div className="flower-details">
                <h3>{flower.name}</h3>
                <p>{flower.description}</p>
                <p className="category">Category: {flower.category}</p>
                <p className="price">${flower.price}</p>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(flower._id)}
                >
                  −
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Flowers;
