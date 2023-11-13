import { NavLink } from 'react-router-dom'
import productData from '../../../assets/selectOptions.json'

const Side = () => {
	return (
		<>
			<h3 className="text-center fw-bold">產品列表</h3>
			<nav className="navbar navbar-expand-lg navbar-light justify-content-center border border-start-0 border-end-0 border-top border-bottom mb-4">
				<ul className="nav nav-pills nav-justified flex-lg-column overflow-auto navbar-custom-scroll">
					{productData.productCategories.map((item) => {
						return (
							<li className="nav-item" key={item.id}>
								<NavLink
									className="nav-link text-nowrap px-2 fs-4"
									to={`/products/${item.id}`}
								>
									{item.title}
								</NavLink>
							</li>
						)
					})}
				</ul>
			</nav>
		</>
	)
}

export default Side
