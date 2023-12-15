import { useOutletContext } from 'react-router-dom'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CartInfo = () => {
	const { cartData } = useOutletContext()
	return (
		<div className="border p-4 mb-4">
			<h4 className="fw-bold mb-2">訂單資訊</h4>
			<table className="table table-responsive table-sm table-borderless align-middle">
				<thead>
					<tr className="border-bottom ">
						<th scope="col" style={{ width: '15%' }} className="text-center">
							商品
						</th>
						<th scope="col"></th>
						<th scope="col" style={{ width: '15%' }} className="text-center">
							數量
						</th>
						<th scope="col" className="text-center">
							小計
						</th>
					</tr>
				</thead>
				<tbody>
					{cartData?.carts?.map((item) => {
						return (
							<tr className="border-bottom" key={item.id}>
								<th scope="row" className="px-0 py-3 align-items-center">
									<img
										src={item.product.imageUrl}
										alt={item.product.title}
										className="w-100 object-fit-cover rounded-2"
									/>
								</th>
								<td>
									<p className="my-1 pe-3">{item.product.title}</p>
								</td>
								<td>
									<p className="mb-0 text-center">{item.qty}</p>
								</td>
								<td className="align-middle text-end">
									<p className="mb-0">NT${item.total}</p>
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>

			<table className="table table-borderless text-muted">
				<tbody>
					<tr>
						<th scope="row" className="ps-0">
							訂單小計
						</th>
						<td className="text-end pe-0">${cartData.total}</td>
					</tr>
					{cartData.total - cartData.final_total > 0 && (
						<>
							<tr>
								<th scope="row" className="ps-0">
									優惠折抵
								</th>
								<td className="text-end pe-0">
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
			<hr />
			<div className="d-flex justify-content-between">
				<p className="mb-0 h4 fw-bold">訂單總金額</p>
				<p className="mb-0 h4 fw-bold">NT${Math.round(cartData.final_total)}</p>
			</div>
		</div>
	)
}

export default CartInfo
