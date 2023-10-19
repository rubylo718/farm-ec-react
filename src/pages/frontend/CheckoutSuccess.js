import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getOrder } from '../../api/front'

export const CheckoutSuccess = () => {
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
					<button className="btn btn-primary text-white" onClick={() => navigation('/')}>回到首頁</button>
				</div>
				<div className="col-md-6">
					<div className="border p-4 mb-4">
						<h4 className="fw-bold mb-2">訂單資訊</h4>
						<table className="table table-sm align-middle">
							<thead>
								<tr className="border-bottom">
									<th scope="col" className="border-0 ps-0 col-5">
										商品
									</th>
									<th scope="col" className="border-0">
										數量
									</th>
									<th scope="col" className="border-0">
										小計
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
														style={{
															maxWidth: '48px',
															objectFit: 'cover',
														}}
													/>
												</div>
												<div className="col-lg-9">
													<p className="my-0 px-2">{item.product.title}</p>
												</div>
											</th>
											<td className="border-0">
												<p className="mb-0 ms-auto align-middle">{item.qty}</p>
											</td>
											<td className="border-0 align-middle">
												<p className="mb-0 ms-auto">NT${item.total}</p>
											</td>
										</tr>
									)
								})}
							</tbody>
						</table>
						<div className="d-flex justify-content-between mt-4">
							<p className="mb-0 h4 fw-bold">訂單總金額</p>
							<p className="mb-0 h4 fw-bold">NT${orderData?.total}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
