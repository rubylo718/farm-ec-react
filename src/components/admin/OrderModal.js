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
			<div className="modal-dialog modal-lg">
				<div className="modal-content">
					<div className="modal-header">
						<h1 className="modal-title fs-5">訂單內容</h1>
						<button
							type="button"
							className="btn-close"
							aria-label="Close"
							onClick={handleHideModal}
						/>
					</div>
					<div className="modal-body">
						<div className="row mb-1">
							<label className="col-sm-3 col-form-label" htmlFor="create_at">
								訂單日期
							</label>
							<div className="col-sm-9">
								<input
									type="date"
									readOnly
									id="create_at"
									name="create_at"
									className=" form-control-plaintext"
									value={unixToDateString(inputData.create_at)}
								/>
							</div>
						</div>
						<div className="row mb-1">
							<label className="col-sm-3 col-form-label" htmlFor="staticName">
								顧客姓名
							</label>
							<div className="col-sm-9">
								<input
									type="text"
									readOnly
									id="staticName"
									name="name"
									className="form-control-plaintext"
									value={inputData.user?.name}
								/>
							</div>
						</div>
						<div className="row mb-1">
							<label className="col-sm-3 col-form-label" htmlFor="staticEmail">
								Email
							</label>
							<div className="col-sm-9">
								<input
									type="text"
									readOnly
									id="staticEmail"
									name="email"
									className="col-md-8 form-control-plaintext"
									value={inputData.user?.email}
								/>
							</div>
						</div>
						<div className="row mb-1">
							<label className="col-sm-3 col-form-label" htmlFor="staticTel">
								聯絡電話
							</label>
							<div className="col-sm-9">
								<input
									type="text"
									readOnly
									id="staticTel"
									name="tel"
									className="form-control-plaintext"
									value={inputData.user?.tel}
								/>
							</div>
						</div>
						<div className="row mb-1">
							<label
								className="col-sm-3 col-form-label"
								htmlFor="staticAddress"
							>
								送貨地址
							</label>
							<div className="col-sm-9">
								<input
									type="text"
									readOnly
									id="staticAddress"
									name="address"
									className="form-control-plaintext"
									value={inputData.user?.address}
								/>
							</div>
						</div>
						<div className="row mb-1">
							<label className="col-sm-3 col-form-label" htmlFor="message">
								顧客留言
							</label>
							<div className="col-sm-9">
								<textarea
									readOnly
									id="message"
									name="message"
									className="form-control-plaintext"
									defaultValue={inputData.message}
								/>
							</div>
						</div>

						<hr />

						<table className="table table-sm">
							<thead>
								<tr>
									<th scope="col">品項名稱</th>
									<th scope="col">數量</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>商品</td>
									<td>3</td>
								</tr>
								<tr>
									<td>item title</td>
									<td>2</td>
								</tr>
							</tbody>
							<tfoot>
								<tr className="">
									<td className="text-end border-bottom-0">總金額</td>
									<td className="border-bottom-0">$ 1200</td>
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
							checked={inputData.is_paid}
						/>
						<label className="form-check-label" htmlFor="is_paid">
							付款狀態（{inputData.is_paid ? '付款完成' : '未付款'}）
						</label>
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-secondary"
							onClick={handleHideModal}
						>
							關閉
						</button>
						<button
							type="button"
							className="btn btn-primary"
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
