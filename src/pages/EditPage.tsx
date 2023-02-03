import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { useParams } from 'react-router-dom';

import { Student } from 'src/interfaces/Student';

import AddEditForm from '../components/AddEditForm';
function EditPage() {
  const [student, setStudent] = useState<Student>(null);
  console.log(student);
  const { id } = useParams();

  const getOneStudent = async (id: string) => {
    const response = await axios.get(`http://localhost:8081/students/${id}`);
    setStudent(response.data);
    console.log('hello', response.data);
  };

  useEffect(() => {
    // Invocation of the function get one task and passing it the id from useParams
    getOneStudent(id);
  }, []);
  if (student === null) {
    return <></>;
  } else {
    return <AddEditForm editing={true} student={student} />;
  }
}

export default EditPage;
