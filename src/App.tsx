import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import EditPage from './pages/EditPage';
import Home from './pages/Home';
import NewStudent from './pages/NewStudent';
import ViewStudent from './pages/ViewStudent';

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/edit/:id' element={<EditPage />} />
				<Route path='/new' element={<NewStudent />} />
				<Route path='students/:id' element={<ViewStudent />} />
			</Routes>
			<Toaster />

		</>

	);
}

export default App;
