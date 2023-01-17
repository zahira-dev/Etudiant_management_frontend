import { useEffect, useState } from 'react';

import axios from 'axios';
import { useParams } from 'react-router';

import Layout from '../components/Layout';
import { Student } from '../interfaces/Student';

function ViewStudent() {
  const [student, setStudent] = useState<Student>();
  const { id } = useParams();

  const getOneStudent = async (id: number) => {
    const response = await axios.get(`http://localhost:8081/students/${id}`);
    setStudent(response.data);
  };
  useEffect(() => {
    getOneStudent(Number(id));
  }, []);
  return (
    <Layout>
      <div>
        <h1>Informations de {student?.firstName}</h1>
        <div>Note : {student?.mark}</div>
        <div>Option :{student?.option}</div>
      </div>
    </Layout>
  );
}

export default ViewStudent;
