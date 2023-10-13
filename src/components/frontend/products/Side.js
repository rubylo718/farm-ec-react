import { NavLink } from 'react-router-dom'

const Side = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-light justify-content-center border border-start-0 border-end-0 border-top border-bottom">
			<ul className="navbar-nav flex-column overflow-auto navbar-custom-scroll">
				<li className="nav-item">
					<NavLink className="nav-link text-nowrap px-2 fs-4 active" to="/">
						Lorem ipsum
					</NavLink>
				</li>
				<li className="nav-item">
					<NavLink className="nav-link text-nowrap px-2 fs-4" to="/">
						Lorem ipsum
					</NavLink>
				</li>
				<li className="nav-item">
					<NavLink className="nav-link text-nowrap px-2 fs-4" to="/">
						Lorem ipsum
					</NavLink>
				</li>
			</ul>
		</nav>
	)
}

export default Side
