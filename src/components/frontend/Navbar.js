import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {
	faSeedling,
	faBasketShopping,
	faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Navbar = ({ cartData }) => {
	const [searchInput, setSearchInput] = useState('')
	const navigate = useNavigate()

	const handleChange = (e) => {
		setSearchInput(e.target.value)
	}
	const handleSearch = (e) => {
		if (!searchInput.length) return
		if (
			e.key === 'Enter' ||
			e.target.id === 'searchNav' ||
			e.target.id === 'searchNavIcon'
		) {
			navigate(`/products/keyword?query=${searchInput}`)
		}
	}

	return (
		<div
			className="bg-white sticky-top"
			style={{
				borderBottom: '1px solid rgba(211,211,211,.74)',
				boxShadow: '1px 0 5px rgba(0,0,0,.15)',
			}}
		>
			<div className="container">
				<nav className="navbar px-0 navbar-expand-lg navbar-light bg-white">
					<div className="container-fluid position-relative">
						<button
							className="navbar-toggler"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#navbarToggler"
							aria-controls="navbarToggler"
							aria-label="Toggle navigation"
						>
							<span className="navbar-toggler-icon"></span>
						</button>
						<NavLink
							className="navbar-brand position-absolute fs-4 el-hover"
							to="/"
							style={{
								top: '20px',
								left: '50%',
								transform: 'translate(-50%, -50%)',
							}}
						>
							<FontAwesomeIcon
								icon={faSeedling}
								className="me-1 text-primary"
							/>
							安心小農
						</NavLink>
						<div
							className="position-absolute el-hover"
							style={{
								top: '20px',
								right: '0%',
								transform: 'translate(-50%, -50%)',
							}}
						>
							<Link to="/cart" className="position-relative">
								<FontAwesomeIcon
									icon={faBasketShopping}
									size="lg"
									className="text-primary"
								/>
								<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill text-bg-danger">
									{cartData?.carts?.length}
								</span>
							</Link>
						</div>
						<div
							className="collapse navbar-collapse bg-white custom-header-md-open mt-1"
							id="navbarToggler"
						>
							<ul className="navbar-nav me-auto mb-2 mb-lg-0">
								<li className="nav-item">
									<NavLink className="nav-link ps-0" to="/products/1">
										產品列表
									</NavLink>
								</li>
								<li className="nav-item me-2">
									<NavLink className="nav-link" to="/blog">
										部落格
									</NavLink>
								</li>
								<li className="nav-item input-group w-50">
									<input
										type="text"
										className="form-control"
										placeholder="搜尋商品名稱"
										value={searchInput}
										onChange={handleChange}
										onKeyDown={handleSearch}
									/>
									<button
										className="btn btn-primary text-white"
										type="button"
										id="searchNav"
										onClick={handleSearch}
									>
										<FontAwesomeIcon
											icon={faMagnifyingGlass}
											className="text-white"
											size="sm"
											id="searchNavIcon"
											onClick={handleSearch}
										/>
									</button>
								</li>
							</ul>
						</div>
					</div>
				</nav>
			</div>
		</div>
	)
}

export default Navbar
