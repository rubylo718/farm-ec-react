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
		<>
			<Navbar cartData={cartData} />
			<Outlet context={{ getCurrentCart, cartData }} />
			<Footer />
		</>
	)
}

export default FrontLayout
