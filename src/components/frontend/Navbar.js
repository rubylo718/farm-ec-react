import { Link, NavLink } from 'react-router-dom'
import { faSeedling, faBasketShopping } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Navbar = ({ cartData }) => {
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
					<NavLink
						className="navbar-brand position-absolute fs-4"
						to="/"
						style={{
							left: '50%',
							transform: 'translate(-50%, -50%)',
							top: '50%',
						}}
					>
						<FontAwesomeIcon icon={faSeedling} className="me-1 text-primary" />
						安心小農
					</NavLink>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNav"
						aria-controls="navbarNav"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div
						className="collapse navbar-collapse bg-white custom-header-md-open"
						id="navbarNav"
					>
						<ul className="nav">
							<li className="nav-item">
								<NavLink className="nav-link ps-0" to="/products/1">
									產品列表
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/about">
									關於我們
								</NavLink>
							</li>
						</ul>
					</div>
					<div className="d-flex">
						<Link to="/">
							<FontAwesomeIcon
								icon={faHeart}
								size="lg"
								className="me-4 text-danger"
							/>
						</Link>
						<Link to="/cart" className="position-relative">
							<FontAwesomeIcon
								icon={faBasketShopping}
								size="lg"
								className="text-primary"
							/>
							<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
								{cartData?.carts?.length}
							</span>
						</Link>
					</div>
				</nav>
			</div>
		</div>
	)
}

export default Navbar
