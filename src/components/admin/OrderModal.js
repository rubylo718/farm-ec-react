import { useEffect, useState } from 'react'
import { editOrder } from '../../api/admin'
import { Toast } from '../../utils/toast-helper'
import { unixToDateString, todayUnix } from '../../utils/dayjs-helper'

const OrderModal = ({ handleHideModal, getOrderList, modalData }) => {
	const [inputData, setInputData] = useState({
		create_at: todayUnix(),
		id: '',
		is_paid: true,
		message: '',
		products: {},
		user: {
			address: '',
			email: '',
			name: '',
			tel: '',
		},
	})
	const handleChange = (e) => {
		setInputData({ ...inputData, is_paid: e.target.checked })
	}

	const handleSubmit = async (id) => {
		const result = await editOrder(inputData, id)
		if (result?.success) {
			Toast.fire({ icon: 'success', title: `${result.message}` })
		} else {
			Toast.fire({
				icon: 'error',
				title: `${result.message || `錯誤，請重新操作`}`,
			})
		}
		getOrderList()
		handleHideModal()
	}

	const handleCancel = () => {
		setInputData({
			...modalData,
			products: { ...modalData.products },
			user: { ...modalData.user },
		})
		handleHideModal()
	}

	useEffect(() => {
		setInputData({
			...modalData,
			products: { ...modalData.products },
			user: { ...modalData.user },
		})
	}, [modalData])

	return (
		<div
			className="modal fade"
			tabIndex="-1"
			aria-labelledby="orderModal"
			aria-hidden="true"
			id="orderModal"
		>
			<div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
				<div className="modal-content">
					<div className="modal-header">
						<h1 className="modal-title fs-5">訂單內容</h1>
						<button
							type="button"
							className="btn-close"
							aria-label="Close"
							onClick={handleCancel}
						/>
					</div>
					<div className="modal-body">
						<table className="table table-borderless">
							<tbody>
								<tr>
									<th scope="row">訂單日期</th>
									<td>{unixToDateString(inputData.create_at)}</td>
								</tr>
								<tr>
									<th scope="row">顧客姓名</th>
									<td>{inputData.user?.name}</td>
								</tr>
								<tr>
									<th scope="row">Email</th>
									<td>{inputData.user?.email}</td>
								</tr>
								<tr>
									<th scope="row">聯絡電話</th>
									<td>{inputData.user?.tel}</td>
								</tr>
								<tr>
									<th scope="row">送貨地址</th>
									<td>{inputData.user?.address}</td>
								</tr>
								<tr>
									<th scope="row">顧客留言</th>
									<td>{inputData.message || '（無）'}</td>
								</tr>
							</tbody>
						</table>

						<hr />

						<table className="table table-sm">
							<thead>
								<tr>
									<th scope="col">商品名稱</th>
									<th scope="col">單價</th>
									<th scope="col">數量</th>
									<th scope="col">小計</th>
								</tr>
							</thead>
							<tbody>
								{Object.values(inputData?.products).map((item) => {
									return (
										<tr key={item.product.id}>
											<td>{item.product.title}</td>
											<td>$ {item.product.price}</td>
											<td>{item.qty}</td>
											<td>$ {item.total}</td>
										</tr>
									)
								})}
							</tbody>
							<tfoot>
								{Object.values(inputData?.products || {})[0]?.coupon &&
									Object.values(inputData?.products || {})[0]?.coupon
										.percent !== 100 && (
										<tr>
											<td colSpan={4}>
												使用優惠：
												{
													Object.values(inputData?.products || {})[0]?.coupon
														?.title
												}
												（折數：
												{
													Object.values(inputData?.products || {})[0]?.coupon
														?.percent
												}
												%）
											</td>
										</tr>
									)}
								<tr>
									<td className="border-bottom-0 fw-bold">訂單總金額</td>
									<td colSpan={2} className="border-bottom-0 text-end">
										NT
									</td>
									<td className="border-bottom-0 fw-bold">
										$ {Math.round(inputData?.total || 0)}
									</td>
								</tr>
							</tfoot>
						</table>

						<h2 className="fs-5">修改訂單狀態</h2>
						<input
							className="form-check-input me-2"
							type="checkbox"
							id="is_paid"
							name="is_paid"
							rows={3}
							onChange={handleChange}
							checked={inputData.is_paid || false}
						/>
						<label className="form-check-label" htmlFor="is_paid">
							付款狀態（{inputData.is_paid ? '完成' : '未完成'}）
						</label>
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-outline-secondary"
							onClick={() => handleCancel()}
						>
							取消
						</button>
						<button
							type="button"
							className="btn btn-primary text-white"
							onClick={() => handleSubmit(modalData.id)}
						>
							儲存
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default OrderModal
