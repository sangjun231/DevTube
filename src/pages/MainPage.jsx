import axios from 'axios';
import React from 'react';

export default function MainPage() {
  const getTest = async () => {
    const response = await axios.get('http://localhost:/4000/test');
    return response.data;
  };

  const getTestById = async (id) => {
    const response = await axios.get(`http://localhost:4000/test/${id}`);
    return response.data;
  };

  return <div>MainPage</div>;
}
