import { useState } from 'react'
import { useOutletContext, useNavigate, Link } from 'react-router-dom'
import { faPlus, faMinus, faCheck } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { deleteCartItem, editCartItem, postCouponFront } from '../../api/front'
import { Toast } from '../../utils/toast-helper'
import Spinner from '../../components/Spinner'
import couponList from '../../assets/couponList.json'
import CheckoutProgress from '../../components/frontend/checkoutProcess/CheckoutProgress'

const Cart = () => {
	const [couponCode, setCouponCode] = useState('')
	const { cartData, getCurrentCart } = useOutletContext()
	const navigation = useNavigate()
	const [isLoading, setIsLoading] = useState(false)

	const handleDeleteItem = async (id) => {
		const result = await deleteCartItem(id)
		if (result.success) {
			Toast.fire({ icon: 'success', title: `${result.message}` })
			getCurrentCart()
		}
	}

	const handleAddQty = async (item) => {
		const newQty = item.qty + 1
		setIsLoading(true)
		const result = await editCartItem(item, newQty)
		if (result.success) {
			getCurrentCart()
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
		} else if (e.target.id === 'reset') {
			const res = await postCouponFront('reset')
			if (res?.success) {
				Toast.fire({ icon: 'warning', title: '已取消使用優惠' })
				setCouponCode('')
				getCurrentCart()
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
			Toast.fire({ icon: 'error', title: res.message })
			setCouponCode('')
		}
		setIsLoading(false)
	}

	return (
		<div className="container my-5">
			<Spinner isLoading={isLoading} />
			<CheckoutProgress step={1} />
			<div className="row">
				<div className="col-md-8 table-responsive">
					<h3 className="mb-4">購物明細</h3>
					<table className="table align-middle">
						<thead>
							<tr className="border-bottom">
								<th scope="col" className="border-0">
									商品
								</th>
								<th scope="col" className="border-0">
									數量
								</th>
								<th scope="col" className="border-0">
									單價
								</th>
								<th scope="col" className="border-0">
									小計
								</th>
								<th scope="col" className="border-0"></th>
							</tr>
						</thead>
						<tbody>
							{cartData?.carts?.map((item) => {
								return (
									<tr className="border-bottom" key={item.id}>
										<th
											scope="row"
											className="row border-0 px-0 py-4 align-items-center"
										>
											<div className="col-lg-4">
												<Link to={`/detail/${item.product.id}`}>
													<img
														className="el-hover"
														src={item.product.imageUrl}
														alt="product"
														style={{
															width: '100%',
															maxWidth: '120px',
															objectFit: 'cover',
														}}
													/>
												</Link>
											</div>
											<div className="col-lg-8">
												<Link
													to={`/detail/${item.product.id}`}
													className="text-reset text-decoration-none el-hover"
												>
													<p className="my-0 text-break">
														{item.product.title}
													</p>
												</Link>
											</div>
										</th>
										<td className="border-0" style={{ maxWidth: '160px' }}>
											<div className="input-group pe-5">
												<button
													className="btn btn-outline-secondary rounded"
													onClick={() => handleMinusQty(item)}
												>
													<FontAwesomeIcon icon={faMinus} size="2xs" />
												</button>
												<input
													type="text"
													className="form-control border-0 text-center bg-light px-1"
													style={{ minWidth: '24px' }}
													aria-label="amount"
													value={item.qty}
													readOnly
												/>
												<button
													className="btn btn-outline-secondary rounded"
													onClick={() => handleAddQty(item)}
												>
													<FontAwesomeIcon icon={faPlus} size="2xs" />
												</button>
											</div>
										</td>
										<td className="border-0 align-middle">
											<small className="mb-0 text-secondary text-decoration-line-through">
												NT${item.product.origin_price}
											</small>
											<p className="mb-0 ms-auto">NT${item.product.price}</p>
										</td>
										<td className="border-0 align-middle">
											<p className="mb-0 ms-auto">NT${item.total}</p>
										</td>
										<td className="border-0 align-middle">
											<button type="button" className="btn el-hover">
												<FontAwesomeIcon
													icon={faTrashCan}
													onClick={() => handleDeleteItem(item.id)}
												/>
											</button>
										</td>
									</tr>
								)
							})}
						</tbody>
					</table>
					{!cartData?.carts.length && (
						<div className="mt-5 text-center">
							<p className="fs-5">您的購物車內尚無商品喔！</p>
							<button
								className="btn btn-info mt-1 text-white"
								onClick={() => navigation('/')}
							>
								去逛逛
							</button>
						</div>
					)}

					{cartData?.carts.length !== 0 && (
						<>
							<div className="input-group w-50 mb-3">
								<input
									type="text"
									className="form-control border-bottom border-top-0 border-start-0 "
									placeholder="輸入welcome打95折"
									aria-label="coupon code"
									value={couponCode}
									onChange={(e) => setCouponCode(e.target.value)}
									onKeyDown={handleCoupon}
								/>

								<button
									className="btn btn-dark rounded-0"
									id="setCoupon"
									onClick={handleCoupon}
								>
									套用
								</button>
								<button
									className="btn btn-secondary rounded-0"
									id="reset"
									onClick={handleCoupon}
								>
									取消
								</button>
							</div>
							<h5 className='mt-4'>選擇優惠碼</h5>
							<table className="table table-sm align-middle">
								<thead className="table-light">
									<tr>
										<th scope="col">名稱</th>
										<th scope="col">優惠碼</th>
										<th scope="col">到期日</th>
										<th scope="col">選擇</th>
									</tr>
								</thead>
								<tbody>
									{couponList.map((item) => (
										<tr key={item.id}>
											<th scope="row">{item.title}</th>
											<td>{item.code}</td>
											<td>{item.dueDate}</td>
											<td>
												<button
													className="btn btn-outline-dark btn-sm"
													onClick={() => handleSelectCoupon(item.code)}
												>
													使用
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</>
					)}
				</div>

				<div className="col-md-4">
					<div className="border p-4 mb-4">
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
							<p className="mb-0 h4 fw-bold">訂單總計</p>
							<p className="mb-0 h4 fw-bold">
								NT${Math.round(cartData.final_total)}
							</p>
						</div>
						{cartData.final_total > 0 && (
							<>
								<button
									className="btn btn-light w-100 mt-4"
									onClick={() => navigation('/')}
								>
									繼續逛逛
								</button>
								<button
									className="btn btn-danger w-100 mt-4"
									onClick={() => navigation('/checkout')}
								>
									結帳
								</button>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Cart
