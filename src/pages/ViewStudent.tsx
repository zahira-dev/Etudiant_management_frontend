import { useEffect, useState } from 'react';

import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
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
      <Grid container spacing={2} sx={{ my: 2, mx: 0.5 }}>
        {' '}
        <Card sx={{ minWidth: 257 }}>
          <CardContent>
            <Typography variant="h4" component="h1">
              Informations de {student?.firstName}
            </Typography>

            <Typography variant="body2">Note : {student?.mark}</Typography>
            <Typography variant="body2">Option : {student?.option}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Layout>
  );
}

export default ViewStudent;
