import { useEffect } from 'react'
import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Toast } from '../../utils/toast-helper'

const Admin = () => {
	const navigate = useNavigate()
	const { isAuthenticated, currentUser, logout } = useAuth()
	useEffect(() => {
		if (!isAuthenticated) {
			Toast.fire({ icon: 'warning', title: '請重新登入' })
			navigate('/login')
		}
	}, [navigate, isAuthenticated])

	const handleLogout = async () => {
		await logout()
		Toast.fire({ icon: 'success', title: '登出成功' })
		navigate('/login')
	}
	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<div className="container-fluid">
					<p className="mb-0 text-white navbar-brand">後台管理系統</p>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNav"
						aria-controls="navbarNav"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon" />
					</button>
					<div
						className="collapse navbar-collapse justify-content-end"
						id="navbarNav"
					>
						<p className="mb-0 me-3 text-white navbar-text">
							登入帳號：{currentUser?.email}
						</p>
						<ul className="navbar-nav">
							<li className="nav-item">
								<button
									type="button"
									className="btn btn-sm btn-outline-light me-3"
								>
									<Link
										to="/"
										target="_blank"
										className="text-reset text-decoration-none"
									>
										開啟前台
									</Link>
								</button>
							</li>
							<li className="nav-item">
								<button
									type="button"
									className="btn btn-sm btn-outline-light"
									onClick={handleLogout}
								>
									登出
								</button>
							</li>
						</ul>
					</div>
				</div>
			</nav>
			<div className="d-flex admin-page">
				<nav className="bg-light admin-right-nav">
					<ul className="nav list-group list-group-flush">
						<li className="nav-item">
							<NavLink
								className="nav-link list-group-item list-group-item-action list-group-item-light py-3"
								to="/admin/products"
							>
								產品列表
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink
								className="nav-link list-group-item list-group-item-action list-group-item-light py-3"
								to="/admin/coupons"
							>
								優惠券列表
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink
								className="nav-link list-group-item list-group-item-action list-group-item-light py-3"
								to="/admin/orders"
							>
								訂單列表
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink
								className="nav-link list-group-item list-group-item-action list-group-item-light py-3"
								to="/admin/stories"
							>
								文章列表
							</NavLink>
						</li>
					</ul>
				</nav>
				<div className="w-100">
					<Outlet />
				</div>
			</div>
		</>
	)
}

export default Admin
