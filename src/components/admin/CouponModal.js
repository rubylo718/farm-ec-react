import { useEffect, useState } from 'react'
import { postCoupon, editCoupon } from '../../api/admin'
import { Toast } from '../../utils/toast-helper'

const CouponModal = ({
	handleHideModal,
	getCouponList,
	modalAction,
	modalData,
}) => {
	const [inputData, setInputData] = useState({
		title: '',
		percent: 100,
		code: '',
		due_date: 1318781876,
		is_enabled: 0,
	})

	const handleChange = (e) => {
		const { name, value } = e.target
		if (['percent'].includes(name)) {
			setInputData({ ...inputData, [name]: Number(value) })
		} else if (name === 'is_enabled') {
			setInputData({ ...inputData, [name]: +e.target.checked })
		} else {
			setInputData({ ...inputData, [name]: value })
		}
	}

	const handleSubmit = async (modalAction, id) => {
		let result
		if (modalAction === 'create') {
			result = await postCoupon(inputData)
		} else if (modalAction === 'edit') {
			result = await editCoupon(inputData, id)
		}
		if (result?.success) {
			Toast.fire({ icon: 'success', title: `${result.message}` })
		} else {
			Toast.fire({ icon: 'error', title: `${result.message}` })
		}
		getCouponList()
		handleHideModal()
	}

	useEffect(() => {
		if (modalAction === 'create') {
			setInputData({
				title: '',
				percent: 100,
				code: '',
				due_date: 1318781876,
				is_enabled: 0,
			})
		} else if (modalAction === 'edit') {
			setInputData(modalData)
		}
	}, [modalAction, modalData])

	return (
		<div
			className="modal fade"
			tabIndex="-1"
			aria-labelledby="couponModal"
			aria-hidden="true"
			id="couponModal"
		>
			<div className="modal-dialog modal-lg">
				<div className="modal-content">
					<div className="modal-header">
						<h1 className="modal-title fs-5">
							{modalAction === 'create' ? '建立新優惠券' : '編輯優惠券'}
						</h1>
						<button
							type="button"
							className="btn-close"
							aria-label="Close"
							onClick={handleHideModal}
						/>
					</div>
					<div className="modal-body">
						<div className="row">
							<div className="col-md-6 mb-2">
								<label className="w-100" htmlFor="title">
									標題
								</label>
								<input
									type="text"
									id="title"
									placeholder="請輸入標題"
									name="title"
									className="form-control mt-1"
									onChange={handleChange}
									value={inputData.title}
								/>
							</div>
							<div className="col-md-6 mb-2">
								<label className="w-100" htmlFor="percent">
									折扣（%）
								</label>
								<input
									type="number"
									name="percent"
									id="percent"
									placeholder="請輸入折扣（%）"
									className="form-control mt-1"
									max={100}
									min={0}
									onChange={handleChange}
									value={inputData.percent}
								/>
							</div>
							<div className="col-md-6 mb-2">
								<label className="w-100" htmlFor="code">
									優惠碼
								</label>
								<input
									type="text"
									id="code"
									name="code"
									placeholder="請輸入優惠碼"
									className="form-control mt-1"
									onChange={handleChange}
									value={inputData.code}
								/>
							</div>
							<div className="col-md-6 mb-2">
								<label className="w-100" htmlFor="due_date">
									到期日
								</label>
								<input
									type="date"
									id="due_date"
									name="due_date"
									placeholder="請輸入到期日"
									className="form-control mt-1"
									onChange={handleChange}
									value={inputData.due_date}
								/>
							</div>
						</div>
						<input
							className="form-check-input me-2"
							type="checkbox"
							id="is_enabled"
							name="is_enabled"
							onChange={handleChange}
							checked={Boolean(inputData.is_enabled)}
						/>
						<label className="form-check-label" htmlFor="is_enabled">
							是否啟用
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
							onClick={() => handleSubmit(modalAction, modalData.id)}
						>
							儲存
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CouponModal
