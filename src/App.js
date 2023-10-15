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
import Products from './pages/frontend/Products'
import Detail from './pages/frontend/Detail'
import Cart from './pages/frontend/Cart'

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
						<Route index element={<FrontHome />}></Route>
						<Route path="products/:categoryId" element={<Products />}></Route>
						<Route path="detail/:id" element={<Detail />}></Route>
						<Route path="cart" element={<Cart />}></Route>
					</Route>
				</Routes>
			</AuthProvider>
		</div>
	)
}

export default App
