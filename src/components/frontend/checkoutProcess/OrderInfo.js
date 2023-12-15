import { unixToDateString } from '../../../utils/dayjs-helper'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const OrderInfo = ({ orderData }) => {
	return (
		<div className="border p-4 mb-4">
			<h4 className="fw-bold mb-4">訂單資訊</h4>
			<p className="mb-1">訂單編號：{orderData?.id}</p>
			<p className="mb-1">訂單日期：{unixToDateString(orderData?.create_at)}</p>
			<p className="mb-1">
				訂單狀態：{orderData?.is_paid ? '已付款' : '尚未付款'}
			</p>
			{orderData?.is_paid && (
				<p className="mb-1">
					付款日期：{unixToDateString(orderData?.paid_date)}
				</p>
			)}
			<h5 className="mt-4">商品明細</h5>
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
					</tr>
				</thead>
				<tbody>
					{Object.values(orderData?.products || {}).map((item) => {
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
									<p className="my-1 px-2">{item.product.title}</p>
								</td>
								<td>
									<p className="mb-0 text-center">{item.qty}</p>
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>

			<table className="table table-borderless text-muted">
				<tbody>
					{Object.values(orderData?.products || {})[0]?.coupon &&
						Object.values(orderData?.products || {})[0].coupon.percent !==
							100 && (
							<>
								<tr>
									<th colSpan={2}>
										<FontAwesomeIcon
											icon={faCheck}
											className="text-primary d-inline"
										/>
										<p className="d-inline ms-2">
											{
												Object.values(orderData?.products || {})[0]?.coupon
													?.title
											}
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
				<p className="mb-0 h4 fw-bold">NT${Math.round(orderData.total)}</p>
			</div>
		</div>
	)
}

export default OrderInfo
