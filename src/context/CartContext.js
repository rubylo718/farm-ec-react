import { useState, useCallback } from 'react'
import { getCart } from '../api/front'
import { Toast } from '../utils/toast-helper'

const CartContext = () => {
	const [cartData, setCartData] = useState({
		carts: [],
		total: 0,
		final_total: 0,
	})
	const getCurrentCart = useCallback(async () => {
		try {
			const { data } = await getCart()
			const { carts, total, final_total } = data.data
			setCartData({ carts, total, final_total })
		} catch (error) {
			Toast.fire({ icon: 'error', title: '取得資料錯誤' })
		}
	}, [])

	return { cartData, getCurrentCart }
}

export default CartContext
