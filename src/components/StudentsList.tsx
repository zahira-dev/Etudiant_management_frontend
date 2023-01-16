/* eslint-disable react/prop-types */
import axios from 'axios';

import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Student } from '../types/student';
interface StudentListProps{
   user: Student
    loadStudents :()=>void
}
function StudentsList({ user, loadStudents }:StudentListProps) {
  const navigate = useNavigate();
  const deleteStudent = async (id:Student['id']) => {
    const response = await axios.delete(`http://localhost:8081/students/${id}`);
    console.log('data', response);
    if (response.status === 200) {
      toast.success('Successfully deleted!');
      loadStudents();
    } else {
      toast.error('Error Deleting This Task');
    }
  };

  return (
    <>

      <div>
        Nom & Prénom :
        {' '}
        {user.firstName}
        {' '}

      </div>
      <div>
        Option:
        {' '}
        {user.option}
      </div>
      <div>
        Note:
        {' '}
        {user.mark}
      </div>
      <div>
        {user.mention}
      </div>
      <div>
        {' '}
        <button style={{ marginLeft: 2 }} type="button" onClick={() => navigate(`students/${user.id}`)}> Voir les informations</button>
        {' '}
        <button
          type="button"
          style={{ marginLeft: 2 }}
          onClick={() => navigate(`edit/${user.id}`)}
        >
          {' '}
          Modifier
          {' '}

        </button>
        <button type="button" style={{ marginLeft: 2 }} onClick={() => deleteStudent(user.id)}>
          Supprimer
          {' '}

        </button>
      </div>

      <div />
    </>

  );
}

export default StudentsList;
