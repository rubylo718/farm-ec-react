import { NavLink } from 'react-router-dom'
import productData from '../../../utils/selectOptions.json'

const Side = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-light justify-content-center border border-start-0 border-end-0 border-top border-bottom">
			<ul className="navbar-nav flex-column overflow-auto navbar-custom-scroll">
				{productData.productCategories.map((item) => {
					return (
						<li className="nav-item" key={item.id}>
							<NavLink className="nav-link text-nowrap px-2 fs-4 active" to={`/products/${item.id}`}>
								{item.title}
							</NavLink>
						</li>
					)
				})}
			</ul>
		</nav>
	)
}

export default Side
