import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Admin from './pages/admin/Admin'
import './styles/style.scss'
import AdminProducts from './pages/admin/AdminProducts';

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/login" element={<Login />}></Route>
				<Route path="/admin" element={<Admin />}>
					<Route path='products' element={<AdminProducts/>}></Route>
				</Route>
			</Routes>
		</div>
	)
}

export default App
