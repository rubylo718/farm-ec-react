import { useOutletContext, useNavigate } from 'react-router-dom'
import CustomerInfoForm from '../../components/frontend/checkoutProcess/CustomerInfoForm'

const Checkout = () => {
	const { cartData } = useOutletContext()
	const navigation = useNavigate()

	return (
		<div className="container my-5">
			<h3 className="mb-4">訂單結帳</h3>
			<div className="row">
				<div className="col-md-8">
					<CustomerInfoForm />
					<div className="d-flex justify-content-end">
						<button
							className="btn btn-light w-25 mt-4"
							onClick={() => navigation(-1)}
						>
							回上一頁
						</button>
						<button className="btn btn-primary w-25 mt-4 ms-4 text-white">
							確認結帳
						</button>
					</div>
				</div>

				<div className="col-md-4">
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
							<p className="mb-0 h4 fw-bold">訂單總金額</p>
							<p className="mb-0 h4 fw-bold">NT${cartData.final_total}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Checkout
