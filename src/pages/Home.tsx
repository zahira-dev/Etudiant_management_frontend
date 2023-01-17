/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';

import { Button, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColumns, GridRenderCellParams } from '@mui/x-data-grid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { Student } from 'src/interfaces/Student';

import Layout from '../components/Layout';

const columns: GridColumns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'Prénom', width: 130 },
  { field: 'lastName', headerName: 'Nom', width: 130 },
  {
    field: 'mark',
    headerName: 'Note',
    type: 'number',
    width: 90,
  },
  {
    field: 'option',

    headerName: 'Filière',
    width: 90,
  },
  {
    field: 'mention',
    headerName: 'Mention',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    renderCell: (params: GridRenderCellParams<number, Student>) =>
      `${params.row.mention} `,
  },
];

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

function Home() {
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([]);
  const loadStudents = async () => {
    const response = await axios.get('http://localhost:8081/students');
    setStudents(response.data);
  };
  useEffect(() => {
    loadStudents();
  }, []);
  return (
    <Layout>
      <Grid container spacing={2} sx={{ my: 2 }}>
        <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h4" component="h1">
            {' '}
            Liste des Etudiants
          </Typography>
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          {' '}
          <Button
            variant="contained"
            disableElevation
            onClick={() => navigate('/New')}
          >
            Ajouter un nouveau étudiant
          </Button>
        </Grid>
      </Grid>

      <DataGrid
        autoHeight
        rows={students}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
      {/* {users.map((user, index) => (
        <StudentsList key={index} user={user} loadStudents={loadStudents} />
      ))} */}
    </Layout>
  );
}

export default Home;
