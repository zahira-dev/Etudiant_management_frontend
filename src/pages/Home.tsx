import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Layout from '../components/Layout';
import StudentsList from '../components/StudentsList';

function Home() {
  const navigate = useNavigate();
  const [users, setusers] = useState([]);
  const loadStudents = async () => {
    const response = await axios.get('http://localhost:8081/students');
    setusers(response.data);
  };
  useEffect(() => {
    loadStudents();
  }, []);
  return (
    <Layout>
      <div>
        <h1>List des Etudiants</h1>
        <button
          type="button"
          style={{ marginBottom: 30, marginLeft: 2 }}
          onClick={() => navigate('/new')}
        >
          {' '}
          Ajouter un nouveau Etudiant
        </button>
      </div>
      {users.map((user, index) => (
        <StudentsList key={index} user={user} loadStudents={loadStudents} />
      ))}
    </Layout>
  );
}

export default Home;
