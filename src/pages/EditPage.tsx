import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';

function EditPage() {
	const [student, setStudent] = useState({
		firstName: '',
		mark: 0,
		option: '',
	});
	const navigate = useNavigate();
	const {id} = useParams();
	const editStudent = async () => {
		const response = await axios.put(
			`http://localhost:8081/students/edit/${id}`,
			{
				firstName: student.firstName,
				mark: student.mark,
				option: student.option,
			},
		);

		console.log('hellp', response);
		if (response.status === 200) {
			toast.success('Successfully edited!');
			setStudent(student);
		} else {
			toast.error('Error while editing This Task');
		}
	};

	const handleChangeName: React.ChangeEventHandler<HTMLInputElement> = event => {
		setStudent({...student, firstName: event.target.value});
	};

	const handleChangeMark: React.ChangeEventHandler<HTMLInputElement> = event => {
		const n = Number(event.target.value);
		setStudent({...student, mark: n});
	};

	const handleChangeOption: React.ChangeEventHandler<HTMLSelectElement> = event => {
		const n = Number(event.target.value);
		setStudent({...student, mark: n});
	};

	const getOneStudent = async (id: any) => {
		const response = await axios.get(`http://localhost:8081/students/${id}`);
		setStudent(response.data);
	};

	useEffect(() => {
		// Invocation of the function get one task and passing it the id from useParams
		getOneStudent(id);
	}, []);
	return (
		<Layout>
			<div>
				<label htmlFor='name'>
					{' '}
          Saisissez le nom complet:
					<input
						id='name'
						type='text'
						name='firstName'
						value={student.firstName}
						onChange={handleChangeName}
					/>
				</label>
			</div>
			<div>
				<label htmlFor='note'>
					{' '}
          Saisissez la note:
					<input
						id='note'
						type='number'
						name='mark'
						onChange={handleChangeMark}
						value={student.mark}
					/>
				</label>
			</div>
			<div>
				<label htmlFor='option'>
					{' '}
          Choisissez la filière:
					<select
						id='option'
						value={student.option}
						onChange={handleChangeOption}
					>
						<option value='Miage'>Miage</option>
						<option value='genie civil'>génie Civil</option>
						<option value='Genie indus'>Génie Industriel</option>
						<option value='genie mecanique'>Génie mécanique</option>
					</select>
				</label>
				<div>
					{' '}
					<button
						style={{padding: 10, marginLeft: 10}}
						type='button'
						onClick={() => {
							navigate('/');
						}}
					>
            Cancel{' '}
					</button>
					<button
						style={{padding: 10, marginLeft: 10}}
						type='button'
						onClick={async () => editStudent()}
					>
            Save{' '}
					</button>
				</div>
			</div>
		</Layout>
	);
}

export default EditPage;
