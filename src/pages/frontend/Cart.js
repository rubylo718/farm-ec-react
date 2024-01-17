import { useState } from 'react'
import { useOutletContext, useNavigate, Link } from 'react-router-dom'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	deleteCartItem,
	deleteCartAll,
	editCartItem,
	postCouponFront,
} from '../../api/front'
import { Toast, DeleteConfirmation } from '../../utils/toast-helper'
import AmountInput from '../../components/frontend/AmountInput'
import Spinner from '../../components/Spinner'
import couponList from '../../assets/couponList.json'
import CheckoutProgress from '../../components/frontend/checkoutProcess/CheckoutProgress'

const Cart = () => {
	const [couponCode, setCouponCode] = useState('')
	const { cartData, getCurrentCart } = useOutletContext()
	const navigation = useNavigate()
	const [isLoading, setIsLoading] = useState(false)

	const handleDeleteItem = async (id) => {
		const { isConfirmed } = await DeleteConfirmation.fire({
			title: '確定刪除此項商品？',
			text: '',
			icon: 'question',
		})
		if (isConfirmed) {
			setIsLoading(true)
			const result = await deleteCartItem(id)
			if (result.success) {
				Toast.fire({ icon: 'success', title: result.message })
				getCurrentCart()
			} else {
				Toast.fire({
					icon: 'error',
					title: result.message || '發生錯誤，無法刪除，請重新整理再試一次',
				})
			}
			setIsLoading(false)
		}
	}

	const handleDeleteCartAll = async () => {
		const { isConfirmed } = await DeleteConfirmation.fire({
			title: '確定刪除購物車所有品項？',
			text: '',
			icon: 'question',
		})
		if (isConfirmed) {
			setIsLoading(true)
			const result = await deleteCartAll()
			if (result?.success) {
				getCurrentCart()
			} else {
				Toast.fire({
					icon: 'error',
					title: result.message || '發生錯誤，無法刪除，請重新整理再試一次',
				})
			}
			setIsLoading(false)
		}
	}

	const handleAddQty = async (item) => {
		const newQty = item.qty + 1
		setIsLoading(true)
		const result = await editCartItem(item, newQty)
		if (result.success) {
			getCurrentCart()
		} else {
			Toast.fire({
				icon: 'error',
				title: result.message || '發生錯誤，請重新整理再試一次',
			})
		}
		setIsLoading(false)
	}

	const handleMinusQty = async (item) => {
		if (item.qty > 1) {
			setIsLoading(true)
			const newQty = item.qty - 1
			const result = await editCartItem(item, newQty)
			if (result.success) {
				getCurrentCart()
			} else {
				Toast.fire({
					icon: 'error',
					title: result.message || '發生錯誤，請重新整理再試一次',
				})
			}
			setIsLoading(false)
		}
	}

	const handleCoupon = async (e) => {
		if (e.key === 'Enter' || e.target.id === 'setCoupon') {
			if (!couponCode.length) return
			setIsLoading(true)
			const res = await postCouponFront(couponCode)
			if (res?.success) {
				Toast.fire({ icon: 'success', title: res.message })
				getCurrentCart()
			} else {
				Toast.fire({ icon: 'error', title: res.message })
				setCouponCode('')
			}
			setIsLoading(false)
		} else if (
			e.target.id === 'reset' &&
			cartData.total !== cartData.final_total
		) {
			const res = await postCouponFront('reset')
			if (res?.success) {
				Toast.fire({ icon: 'warning', title: '已取消使用優惠' })
				setCouponCode('')
				getCurrentCart()
			} else {
				Toast.fire({
					icon: 'error',
					title: res.message || '發生錯誤，請重新整理再試一次',
				})
			}
		}
	}

	const handleSelectCoupon = async (code) => {
		setCouponCode(code)
		setIsLoading(true)
		const res = await postCouponFront(code)
		if (res?.success) {
			Toast.fire({ icon: 'success', title: res.message })
			getCurrentCart()
		} else {
			Toast.fire({
				icon: 'error',
				title: res.message || '發生錯誤，請重新整理再試一次',
			})
			setCouponCode('')
		}
		setIsLoading(false)
	}

	return (
		<div className="container my-5">
			<Spinner isLoading={isLoading} />
			<CheckoutProgress step={1} />
			{!cartData?.carts.length && (
				<div className="mt-5 text-center">
					<p className="fs-4">您的購物車內尚無商品喔！</p>
					<button
						type="button"
						className="btn btn-primary mt-1 text-white"
						onClick={() => navigation('/')}
					>
						去逛逛
					</button>
				</div>
			)}

			{cartData?.carts?.length !== 0 && (
				<div className="row">
					<div className="col-lg-8">
						<h3>購物明細</h3>
						<div className="card my-4">
							<div className="card-header">
								商品資訊
								<button
									type="button"
									className="btn btn-sm p-0 float-end text-decoration-underline"
									onClick={handleDeleteCartAll}
								>
									全部刪除
								</button>
							</div>
							<ul className="list-group list-group-flush">
								{cartData?.carts?.map((item) => (
									<li
										className="list-group-item position-relative"
										key={item.id}
									>
										<div className="row align-items-center">
											<div className="col-4">
												<Link to={`/detail/${item.product.id}`}>
													<img
														className="el-hover rounded-2 w-100 object-fit-cover cart-list-img"
														src={item.product.imageUrl}
														alt={item.product.title}
													/>
												</Link>
											</div>
											<div className="col-6">
												<div className="row">
													<Link
														to={`/detail/${item.product.id}`}
														className="text-reset text-decoration-none el-hover"
													>
														<p className="mb-0 text-break">
															{item.product.title}
														</p>
													</Link>
												</div>
												<div className="my-1">${item.product.price}</div>
												<div className="row">
													<AmountInput
														qty={item.qty}
														handleAdd={() => handleAddQty(item)}
														handleMinus={() => handleMinusQty(item)}
													/>
												</div>
											</div>
											<div className="col-2 text-center p-0">
												<div>${item.total}</div>
											</div>
										</div>
										<div className="position-absolute top-0 end-0 me-1">
											<button
												type="button"
												className="btn border-0 el-hover input-h40"
											>
												<FontAwesomeIcon
													icon={faTrashCan}
													onClick={() => handleDeleteItem(item.id)}
												/>
											</button>
										</div>
									</li>
								))}
							</ul>
						</div>
						<div className="input-group mb-3 input-h40 coupon-input-max-width">
							<input
								type="text"
								id="couponCode"
								className="form-control"
								placeholder="輸入welcome打95折"
								aria-label="coupon code"
								value={couponCode}
								onChange={(e) => setCouponCode(e.target.value)}
								onKeyDown={handleCoupon}
							/>

							<button
								type="button"
								className="btn btn-primary text-white"
								id="setCoupon"
								onClick={handleCoupon}
							>
								套用
							</button>
							<button
								type="button"
								className="btn btn-secondary"
								id="reset"
								onClick={handleCoupon}
							>
								取消
							</button>
						</div>
						<h5 className="mt-4">您目前可使用優惠券</h5>
						<table className="table align-middle rounded-2">
							<thead className="table-light">
								<tr>
									<th scope="col">名稱</th>
									<th scope="col">到期日</th>
									<th scope="col">選擇</th>
								</tr>
							</thead>
							<tbody>
								{couponList.map((item) => (
									<tr key={item.id}>
										<th scope="row">{item.title}</th>
										<td>{item.dueDate}</td>
										<td>
											<button
												type="button"
												className="btn btn-primary text-white text-nowrap btn-sm"
												onClick={() => handleSelectCoupon(item.code)}
											>
												使用
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<div className="col-lg-4">
						<div className="border rounded-2 p-4 mb-4">
							<h4 className="fw-bold mb-2">訂單資訊</h4>
							<table className="table text-muted border-bottom">
								<tbody>
									<tr>
										<th
											scope="row"
											className="border-0 px-0 pt-4 font-weight-normal"
										>
											訂單小計
										</th>
										<td className="text-end border-0 px-0 pt-4">
											${cartData.total}
										</td>
									</tr>
									{cartData.total - cartData.final_total > 0 && (
										<>
											<tr>
												<th
													scope="row"
													className="border-0 px-0 pt-0 pb-2 font-weight-normal"
												>
													優惠折抵
												</th>
												<td className="text-end border-0 px-0 pt-0 pb-2">
													-${cartData.total - Math.round(cartData.final_total)}
												</td>
											</tr>
											<tr>
												<th colSpan={2}>
													<FontAwesomeIcon
														icon={faCheck}
														className="text-primary d-inline"
													/>
													<p className="d-inline ms-2">
														{cartData?.carts[0]?.coupon?.title}
													</p>
												</th>
											</tr>
										</>
									)}
								</tbody>
							</table>
							<div className="d-flex justify-content-between mt-4">
								<p className="mb-0 h4 fw-bold">總計</p>
								<p className="mb-0 h4 fw-bold">
									NT${Math.round(cartData.final_total)}
								</p>
							</div>
							<button
								type="button"
								className="btn btn-light w-100 mt-4"
								onClick={() => navigation('/')}
							>
								繼續逛逛
							</button>
							<button
								type="button"
								className="btn btn-primary text-white w-100 mt-3"
								onClick={() => navigation('/checkout')}
							>
								結帳
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default Cart
