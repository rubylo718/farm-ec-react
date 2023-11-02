import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/frontend/Footer'
import Navbar from '../../components/frontend/Navbar'
import { getCart } from '../../api/front'

const FrontLayout = () => {
	const [cartData, setCartData] = useState({
		carts: [],
		total: 0,
		final_total: 0,
	})
	const getCurrentCart = async () => {
		const { carts, total, final_total } = await getCart()
		setCartData({ carts, total, final_total })
	}
	useEffect(() => {
		getCurrentCart()
	}, [])

	return (
		<div className="d-flex flex-column min-vh-100"
		style={{ maxWidth: `100%`, width: `100%` }}
		>
			<Navbar cartData={cartData} />
			<main className="flex-grow-1">
				<Outlet context={{ getCurrentCart, cartData }} />
			</main>
			<Footer />
		</div>
	)
}

export default FrontLayout
