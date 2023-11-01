import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getOrder } from '../../api/front'
import { unixToDateString } from '../../utils/dayjs-helper'

const CheckoutSuccess = () => {
	const { orderId } = useParams()
	const [orderData, setOrderData] = useState({})
	const navigation = useNavigate()

	useEffect(() => {
		const getOrderData = async (orderId) => {
			const result = await getOrder(orderId)
			if (result.success) {
				setOrderData(result.order)
			}
		}
		getOrderData(orderId)
	}, [orderId])

	return (
		<div className="container my-5">
			<h3 className="mb-4">付款成功</h3>
			<div className="row">
				<div className="col-md-6">
					<p>感謝惠顧！</p>
					<p>您的商品會在 3~5 個工作天送達，若有問題請洽客服。</p>
					<button
						className="btn btn-primary text-white"
						onClick={() => navigation('/')}
					>
						回到首頁
					</button>
				</div>
				<div className="col-md-6">
					<div className="border p-4 mb-4">
						<h4 className="fw-bold mb-3 ">訂單內容</h4>
						<p className="mb-1 fw-bold">訂單編號：{orderData?.id}</p>
						<p className="fw-bold">
							購買日期：{unixToDateString(orderData?.create_at)}
						</p>
						<h5>商品明細</h5>
						<table className="table table-sm align-middle">
							<thead>
								<tr className="border-bottom">
									<th scope="col" className="border-0 ps-0">
										商品
									</th>
									<th scope="col" className="border-0 w-25 text-center">
										數量
									</th>
								</tr>
							</thead>
							<tbody>
								{Object.values(orderData?.products || {}).map((item) => {
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
														className='w-100 object-fit-cover el-hover'
														// style={{
														// 	width: '100%',
														// 	objectFit: 'cover',
														// }}
													/>
												</div>
												<div className="col-lg-9">
													<p className="my-0 px-2">{item.product.title}</p>
												</div>
											</th>
											<td className="border-0">
												<p className="mb-0 ms-auto align-middle text-center">
													{item.qty}
												</p>
											</td>
										</tr>
									)
								})}
							</tbody>
							<tfoot>
								<tr>
									<td className="border-0">
										{Object.values(orderData?.products || {})[0]?.coupon &&
											`使用優惠碼：${
												Object.values(orderData?.products || {})[0]?.coupon
													?.code
											}`}
									</td>
								</tr>
							</tfoot>
						</table>
						<div className="d-flex justify-content-between mt-4">
							<p className="mb-0 h4 fw-bold">訂單總金額</p>
							<p className="mb-0 h4 fw-bold">
								NT${Math.round(orderData?.total)}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CheckoutSuccess
