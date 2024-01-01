import { useState } from 'react'
import { getCart } from '../api/front'

const CartContext = () => {
	const [cartData, setCartData] = useState({
		carts: [],
		total: 0,
		final_total: 0,
	})
	const getCurrentCart = async () => {
		const { carts, total, final_total } = await getCart()
		setCartData({ carts, total, final_total })
	}

	return { cartData, getCurrentCart }
}

export default CartContext
