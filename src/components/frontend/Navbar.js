import { useState, useEffect, useRef } from 'react'
import {
	Link,
	NavLink,
	useNavigate,
	useLocation,
	useSearchParams,
} from 'react-router-dom'
import {
	faSeedling,
	faBasketShopping,
	faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Collapse } from 'bootstrap'

const Navbar = ({ cartData }) => {
	const [searchInput, setSearchInput] = useState('')
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const [searchParams] = useSearchParams()
	const searchString = searchParams.get('query')
	const navCollapse = useRef(null)

	const handleChange = (e) => {
		setSearchInput(e.target.value)
	}
	const handleSearch = (e) => {
		const searchString = searchInput.trim()
		if (!searchString.length) return
		if (
			e.key === 'Enter' ||
			e.target.id === 'searchNav' ||
			e.target.id === 'searchNavIcon'
		) {
			navigate(`/products/keyword?query=${searchString}`)
		}
	}

	useEffect(() => {
		navCollapse.current = new Collapse('#navbarToggler', { toggle: false })
	}, [])

	useEffect(() => {
		if (pathname.startsWith('/products/keyword') && searchString) {
			setSearchInput(searchString)
		} else {
			setSearchInput('')
		}
		navCollapse.current.hide()
	}, [pathname, searchString])

	return (
		<div className="bg-white sticky-top nav-border">
			<div className="container">
				<nav className="navbar px-0 navbar-expand-lg navbar-light bg-white">
					<div className="container-fluid px-0">
						<div className="d-flex flex-nowrap">
							<button
								className="navbar-toggler me-2 px-2"
								type="button"
								data-bs-toggle="collapse"
								data-bs-target="#navbarToggler"
								aria-controls="navbarToggler"
								aria-label="Toggle navigation"
							>
								<span className="navbar-toggler-icon"></span>
							</button>
							<NavLink className="navbar-brand el-hover" to="/">
								<FontAwesomeIcon
									icon={faSeedling}
									className="me-1 text-primary"
								/>
								安心小農
							</NavLink>
						</div>
						<div
							className="collapse navbar-collapse bg-white justify-content-between custom-header-md-open me-lg-5 mt-2 mt-lg-0"
							id="navbarToggler"
						>
							<div className="input-group input-h40 nav-search-input">
								<input
									type="search"
									id="searchInputNav"
									className="form-control"
									placeholder="搜尋商品名稱"
									value={searchInput}
									onChange={handleChange}
									onKeyDown={handleSearch}
								/>
								<button
									className="btn btn-primary text-white"
									type="submit"
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
							</div>
							<ul className="navbar-nav">
								<li className="nav-item">
									<NavLink className="nav-link" to="/products/1">
										產品列表
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink className="nav-link" to="/blog">
										部落格
									</NavLink>
								</li>
							</ul>
						</div>
						<div className="position-absolute el-hover cart-icon">
							<Link to="/cart" className="position-relative">
								<FontAwesomeIcon
									icon={faBasketShopping}
									size="lg"
									className="text-primary"
								/>
								{cartData?.carts?.length ? (
									<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill text-bg-danger cart-badge">
										{cartData?.carts?.length}
									</span>
								) : null}
							</Link>
						</div>
					</div>
				</nav>
			</div>
		</div>
	)
}

export default Navbar
