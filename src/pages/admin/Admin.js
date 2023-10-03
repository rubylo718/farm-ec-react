import { Link, Outlet } from 'react-router-dom'

const Admin = () => {
	return (
		<>
			<nav className="navbar navbar-expand-lg bg-dark">
				<div className="container-fluid">
					<p className="mb-0 text-white">後台管理系統</p>
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
						<ul className="navbar-nav">
							<li className="nav-item">
								<button type="button" className="btn btn-sm btn-outline-light">
									登出
								</button>
							</li>
						</ul>
					</div>
				</div>
			</nav>
			<div className="d-flex" style={{ minHeight: 'calc(100vh - 56px)' }}>
				<div className="bg-light" style={{ width: '200px' }}>
					<ul className="list-group list-group-flush">
						<Link
							className="list-group-item list-group-item-action py-3"
							to="/admin/products"
						>
							產品列表
						</Link>
						<Link
							className="list-group-item list-group-item-action py-3"
							to="/admin/coupons"
						>
							優惠券列表
						</Link>
						<Link
							className="list-group-item list-group-item-action py-3"
							to="/admin/orders"
						>
							訂單列表
						</Link>
					</ul>
				</div>
				<div className="w-100">
					<Outlet />
				</div>
			</div>
		</>
	)
}

export default Admin
