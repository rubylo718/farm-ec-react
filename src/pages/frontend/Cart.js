import { useOutletContext, useNavigate } from 'react-router-dom'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { deleteCartItem, editCartItem } from '../../api/front'
import { Toast } from '../../utils/toast-helper'

const Cart = () => {
	const { cartData, getCurrentCart } = useOutletContext()
	const navigation = useNavigate()

	const handleDeleteItem = async (id) => {
		const result = await deleteCartItem(id)
		if (result.success) {
			Toast.fire({ icon: 'success', title: `${result.message}` })
			getCurrentCart()
		}
	}

	const handleAddQty = async (item) => {
		const newQty = item.qty + 1
		const result = await editCartItem(item, newQty)
		if (result.success) {
			getCurrentCart()
		}
	}

	const handleMinusQty = async (item) => {
		if (item.qty > 1) {
			const newQty = item.qty - 1
			const result = await editCartItem(item, newQty)
			if (result.success) {
				getCurrentCart()
			}
		}
	}

	return (
		<div className="container my-5">
			<h3 className="mb-4">購物明細</h3>
			<div className="row">
				<div className="col-md-8 table-responsive">
					<table className="table align-middle">
						<thead>
							<tr className="border-bottom">
								<th scope="col" className="border-0 ps-0 col-5">
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
								console.log(item)
								return (
									<tr className="border-bottom" key={item.id}>
										<th
											scope="row"
											className="row border-0 px-0 py-4 align-items-center"
										>
											<div className="col-lg-3">
												<img
													src={item.product.imageUrl}
													alt="product"
													style={{
														maxWidth: '72px',
														objectFit: 'cover',
													}}
												/>
											</div>
											<div className="col-lg-9">
												<p className="my-0 px-2 text-break">
													{item.product.title}
												</p>
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
													className="form-control border-0 text-center bg-light"
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
											<button type="button" className="btn">
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

					<div className="input-group w-50 mb-3">
						<input
							type="text"
							className="form-control border-bottom border-top-0 border-start-0 "
							placeholder="請輸入優惠碼"
							aria-label="coupon code"
						/>

						<button className="btn btn-secondary rounded-0">套用</button>
					</div>
				</div>

				<div className="col-md-4">
					<div className="border p-4 mb-4">
						<h4 className="fw-bold mb-4">訂單資訊</h4>
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
									<tr>
										<th
											scope="row"
											className="border-0 px-0 pt-0 pb-4 font-weight-normal"
										>
											優惠折抵
										</th>
										<td className="text-end border-0 px-0 pt-0 pb-4">
											-${cartData.total - cartData.final_total}
										</td>
									</tr>
								)}
							</tbody>
						</table>
						<div className="d-flex justify-content-between mt-4">
							<p className="mb-0 h4 fw-bold">訂單總計</p>
							<p className="mb-0 h4 fw-bold">NT${cartData.final_total}</p>
						</div>

						<button
							className="btn btn-outline-dark w-100 mt-4"
							onClick={() => navigation(-1)}
						>
							繼續逛逛
						</button>
						<button
							className="btn btn-danger w-100 mt-4"
							onClick={() => navigation('/checkout')}
						>
							結帳
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Cart
