import { useForm, useWatch } from 'react-hook-form'
import { editOrder } from '../../api/admin'
import { Toast } from '../../utils/toast-helper'
import { unixToDateString, dateStringToUnix } from '../../utils/dayjs-helper'
import Input from '../form/Input'
import Checkbox from '../form/Checkbox'
import Spinner from '../Spinner'

const OrderModal = ({ handleHideModal, getOrderList, modalData }) => {
	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { isDirty, errors, isSubmitting },
	} = useForm({
		mode: 'onSubmit',
		values: {
			...modalData,
			paid_date: unixToDateString(modalData.paid_date || 0),
		},
	})

	const watchIsPaid = useWatch({
		control,
		name: 'is_paid',
		defaultValue: modalData.is_paid,
	})

	const onSubmit = async (data) => {
		if (!isDirty) {
			handleHideModal()
			return
		}
		let newData
		if (!data.is_paid) {
			newData = { ...data, paid_date: 0 }
		} else {
			newData = { ...data, paid_date: dateStringToUnix(data.paid_date) }
		}
		try {
			await editOrder(newData, newData.id)
			Toast.fire({ icon: 'success', title: '更新成功' })
			getOrderList()
			handleHideModal()
		} catch (error) {
			Toast.fire({ icon: 'error', title: '發生錯誤，請重新操作' })
		}
	}

	const handleCancel = () => {
		reset()
		handleHideModal()
	}

	return (
		<div
			className="modal fade"
			tabIndex="-1"
			aria-labelledby="orderModal"
			aria-hidden="true"
			id="orderModal"
		>
			<Spinner isLoading={isSubmitting} />
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
						<form onSubmit={handleSubmit(onSubmit)} id="orderModalForm">
							<table className="table table-borderless">
								<tbody>
									<tr>
										<th scope="row">訂單日期</th>
										<td>{unixToDateString(modalData.create_at)}</td>
									</tr>
									<tr>
										<th scope="row">顧客姓名</th>
										<td>{modalData.user?.name}</td>
									</tr>
									<tr>
										<th scope="row">Email</th>
										<td>{modalData.user?.email}</td>
									</tr>
									<tr>
										<th scope="row">聯絡電話</th>
										<td>{modalData.user?.tel}</td>
									</tr>
									<tr>
										<th scope="row">送貨地址</th>
										<td>{modalData.user?.address}</td>
									</tr>
									<tr>
										<th scope="row">顧客留言</th>
										<td>{modalData.message || '（無）'}</td>
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
									{Object.values(modalData?.products || {}).map((item) => {
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
									{Object.values(modalData?.products || {})[0]?.coupon &&
										Object.values(modalData?.products || {})[0]?.coupon
											.percent !== 100 && (
											<tr>
												<td colSpan={4}>
													使用優惠：
													{
														Object.values(modalData?.products || {})[0]?.coupon
															?.title
													}
													（折數：
													{
														Object.values(modalData?.products || {})[0]?.coupon
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
											$ {Math.round(modalData?.total || 0)}
										</td>
									</tr>
								</tfoot>
							</table>

							<hr />

							<h5 className="fs-5">修改付款狀態</h5>
							<div className="form-group mb-2 ">
								<Checkbox
									register={register}
									errors={errors}
									id="is_paid"
									labelText="完成"
								/>
							</div>
							{watchIsPaid ? (
								<div className="form-group mb-2 w-50">
									<Input
										register={register}
										errors={errors}
										id="paid_date"
										type="date"
										labelText="付款日期"
										rules={{
											validate: (str) =>
												str !== '1970-01-01' || '請選擇正確付款日期',
										}}
									/>
								</div>
							) : (
								''
							)}
						</form>
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-outline-secondary"
							onClick={handleCancel}
							form="orderModalForm"
						>
							取消
						</button>
						<button
							type="submit"
							className="btn btn-primary text-white"
							form="orderModalForm"
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
