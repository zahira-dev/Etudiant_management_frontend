/* eslint-disable react/button-has-type */
/* eslint-disable no-shadow */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import Layout from '../components/Layout';
import { Student } from '../types/student';

function ViewStudent() {
  const [student, setStudent] = useState<Student>();
  const { id } = useParams();
  // const navigate = useNavigate();
  const getOneStudent = async (id:number) => {
    const response = await axios.get(`http://localhost:8081/students/${id}`);
    setStudent(response.data);
  };
  useEffect(() => {
    getOneStudent(Number(id));
  }, []);
  return (
    <Layout>
      <div>
        <h1>
          Informations de
          {' '}
          {student?.firstName}
        </h1>
        <div>
          Note :
          {' '}
          {student?.mark}
        </div>
        <div>
          Option :
          {student?.option}
        </div>
        {/* <button style={{ marginRight: 10, marginLeft: 2 }} onClick={() =>
        navigate(`/edit/${user.id}`)}>Modifier</button>
        <button>Supprimer</button>  */}
      </div>
    </Layout>
  );
}

export default ViewStudent;
