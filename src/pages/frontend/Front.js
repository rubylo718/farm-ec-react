import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/frontend/Footer'
import Navbar from '../../components/frontend/Navbar'
import CartContext from '../../context/CartContext'

const FrontLayout = () => {
	const { cartData, getCurrentCart } = CartContext()

	useEffect(() => {
		getCurrentCart()
	}, [getCurrentCart])

	return (
		<div className="d-flex flex-column w-100 mw-100 min-vh-100">
			<Navbar cartData={cartData} />
			<main className="flex-grow-1">
				<Outlet context={{ getCurrentCart, cartData }} />
			</main>
			<Footer />
		</div>
	)
}

export default FrontLayout
