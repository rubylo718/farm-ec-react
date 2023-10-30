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
import Checkout from './pages/frontend/Checkout'
import CheckoutSuccess from './pages/frontend/CheckoutSuccess'
import SearchResult from './pages/frontend/SearchResult'
import AdminStoryContent from './pages/admin/AdminStoryContent'
import AdminStoriesIndex from './pages/admin/AdminStoryIndex'
import Blog from './pages/frontend/Blog'
import BlogList from './pages/frontend/BlogList'
import BlogContent from './pages/frontend/BlogContent'

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
						<Route path="stories" element={<AdminStoriesIndex />}>
							<Route path=":id" element={<AdminStoryContent />}></Route>
						</Route>
					</Route>
					<Route path="/" element={<Front />}>
						<Route index element={<FrontHome />}></Route>
						<Route path="products/keyword" element={<SearchResult />}></Route>
						<Route path="products/:categoryId" element={<Products />}></Route>
						<Route path="detail/:id" element={<Detail />}></Route>
						<Route path="cart" element={<Cart />}></Route>
						<Route path="checkout" element={<Checkout />}></Route>
						<Route
							path="success/:orderId"
							element={<CheckoutSuccess />}
						></Route>
						<Route path="blog" element={<Blog />}>
							<Route index element={<BlogList />}></Route>
							<Route path=":id" element={<BlogContent />}></Route>
						</Route>
					</Route>
				</Routes>
			</AuthProvider>
		</div>
	)
}

export default App
