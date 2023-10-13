import { Routes, Route } from 'react-router-dom'
import './styles/style.scss'
import Login from './pages/Login'
import Admin from './pages/admin/Admin'
import AdminProducts from './pages/admin/AdminProducts'
import AdminCoupons from './pages/admin/AdminCoupons'
import AdminOrders from './pages/admin/AdminOrders'
import { AuthProvider } from './context/AuthContext'
import Front from './pages/frontend/Front'
import FrontHome from './pages/frontend/FrontHome'
import Products from './pages/frontend/Products';

function App() {
	return (
		<div className="App">
			<AuthProvider>
				<Routes>
					<Route path="/login" element={<Login />}></Route>
					<Route path="/admin" element={<Admin />}>
						<Route path="products" element={<AdminProducts />}></Route>
						<Route path="coupons" element={<AdminCoupons />}></Route>
						<Route path="orders" element={<AdminOrders />}></Route>
					</Route>
					<Route path="/" element={<Front />}>
						<Route path="" element={<FrontHome />}></Route>
						<Route path="products" element={<Products/>}></Route>
					</Route>
				</Routes>
			</AuthProvider>
		</div>
	)
}

export default App
