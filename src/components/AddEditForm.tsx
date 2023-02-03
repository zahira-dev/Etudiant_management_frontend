import React, { useState } from 'react';

import { Button, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router';

import { Student } from 'src/interfaces/Student';

import Layout from '../components/Layout';
interface FunctionProps {
  editing: boolean;
  student?: Student;
}
const AddEditForm = ({ editing, student: studentProps }: FunctionProps) => {
  const [student, setStudent] = useState<Student>(
    studentProps
      ? studentProps
      : {
          id: 1,
          firstName: '',
          lastName: '',
          mark: 0,
          option: '',
          mention: '',
        }
  );
  console.log('hey', student);
  const navigate = useNavigate();
  const { id } = useParams();
  const onSubmit = async () => {
    if (editing) {
      const response = await axios.put(
        `http://localhost:8081/students/edit/${id}`,
        {
          firstName: student.firstName,
          mark: student.mark,
          option: student.option,
        }
      );

      if (response.status === 200) {
        toast.success('Successfully edited!');
        setStudent(student);
      } else {
        toast.error('Error while editing This Task');
      }
    } else {
      try {
        const response = await axios.post(
          'http://localhost:8081/students/new',
          {
            firstName: student.firstName,
            mark: student.mark,
            option: student.option,
          }
        );
        console.log('status', response);
        toast.success('Successfully added!');
        navigate('/');
      } catch (error) {
        toast.error('cant add this object: ' + error.response.data.message);
      }
    }
  };
  const handleChangeFirstName: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setStudent({ ...student, firstName: event.target.value });
  };

  const handleChangeMark: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const n = Number(event.target.value);
    setStudent({ ...student, mark: n });
  };
  const handleChangeLastName: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setStudent({ ...student, lastName: event.target.value });
  };

  const handleChange = (event: SelectChangeEvent) => {
    setStudent({ ...student, option: event.target.value as string });
  };

  return (
    <Layout>
      <Box component="form" sx={{ width: '100%' }}>
        <Grid container sx={{ my: 2 }}>
          <FormControl fullWidth>
            <TextField
              id="outlined-error"
              label="Saisissez le prénom"
              onChange={handleChangeFirstName}
              value={student.firstName}
            />
          </FormControl>
        </Grid>
        <Grid container sx={{ my: 2 }}>
          <FormControl fullWidth>
            <TextField
              id="outlined-error"
              label="Saisissez le nom"
              onChange={handleChangeLastName}
              value={student.lastName}
            />
          </FormControl>
        </Grid>
        <Grid container sx={{ my: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Selectionnez une option
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={student.option}
              label=" Selectionnez une option"
              onChange={handleChange}
            >
              <MenuItem value="Miage">Miage</MenuItem>
              <MenuItem value="GM">Genie mecanique</MenuItem>
              <MenuItem value="genie indus">Genie indus</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid container sx={{ my: 2 }}>
          <FormControl fullWidth>
            <TextField
              id="outlined-number"
              label="Note Etudiant"
              type="number"
              value={student.mark}
              onChange={handleChangeMark}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
        </Grid>
        <Grid container sx={{ my: 2 }}>
          {' '}
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={() => onSubmit()}>
              Save
            </Button>
            <Button variant="outlined" onClick={() => navigate('/')}>
              Cancel
            </Button>
          </Stack>
        </Grid>
      </Box>
    </Layout>
  );
};

export default AddEditForm;
