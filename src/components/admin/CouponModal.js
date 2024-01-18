import { useForm } from 'react-hook-form'
import { postCoupon, editCoupon } from '../../api/admin'
import { Toast } from '../../utils/toast-helper'
import { dateStringToUnix, unixToDateString } from '../../utils/dayjs-helper'
import Input from '../form/Input'
import Checkbox from '../form/Checkbox'
import Spinner from '../Spinner'

const CouponModal = ({ handleHideModal, getCouponList, modalData }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { isDirty, errors, isSubmitting },
	} = useForm({
		mode: 'onSubmit',
		values: {
			...modalData,
			is_enabled: Boolean(modalData.is_enabled),
			due_date: unixToDateString(modalData.due_date),
		},
	})

	const onSubmit = async (data) => {
		if (!isDirty) {
			handleHideModal()
			return
		}
		const newData = {
			...data,
			is_enabled: +data.is_enabled,
			due_date: dateStringToUnix(data.due_date),
		}
		let result
		if (newData.action === 'create') {
			result = await postCoupon(newData)
		} else if (newData.action === 'edit') {
			result = await editCoupon(newData, newData.id)
		}
		if (result?.success) {
			Toast.fire({ icon: 'success', title: `${result.message}` })
		} else {
			Toast.fire({
				icon: 'error',
				title: `${result.message || `錯誤，請重新操作`}`,
			})
		}
		getCouponList()
		handleHideModal()
	}

	const handleCancel = () => {
		reset()
		handleHideModal()
	}

	return (
		<div
			className="modal fade"
			tabIndex="-1"
			aria-labelledby="couponModal"
			aria-hidden="true"
			id="couponModal"
		>
			<Spinner isLoading={isSubmitting} />
			<div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
				<div className="modal-content">
					<div className="modal-header">
						<h1 className="modal-title fs-5">
							{modalData.action === 'create' ? '建立新優惠券' : '編輯優惠券'}
						</h1>
						<button
							type="button"
							className="btn-close"
							aria-label="Close"
							onClick={handleCancel}
						/>
					</div>
					<div className="modal-body">
						<form onSubmit={handleSubmit(onSubmit)} id="couponModalForm">
							<div className="row">
								<div className="form-group col-md-6 mb-2">
									<Input
										register={register}
										errors={errors}
										id="title"
										type="text"
										labelText="標題"
										rules={{ required: '請輸入標題' }}
									/>
								</div>
								<div className="form-group col-md-6 mb-2">
									<Input
										register={register}
										errors={errors}
										id="percent"
										type="number"
										labelText="折扣（%）"
										rules={{
											valueAsNumber: true,
											min: { value: 1, message: '折扣不得為零' },
											max: { value: 100, message: '折扣不大於100' },
										}}
									/>
								</div>
								<div className="form-group col-md-6 mb-2">
									<Input
										register={register}
										errors={errors}
										id="code"
										type="text"
										labelText="優惠碼"
										rules={{ required: '請輸入優惠碼' }}
									/>
								</div>
								<div className="form-group col-md-6 mb-2">
									<Input
										register={register}
										errors={errors}
										id="due_date"
										type="date"
										labelText="到期日"
									/>
								</div>
							</div>
							<div className="form-group mb-2">
								<Checkbox
									register={register}
									errors={errors}
									id="is_enabled"
									labelText="啟用"
								/>
							</div>
						</form>
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-outline-secondary"
							onClick={handleCancel}
							form="couponModalForm"
						>
							取消
						</button>
						<button
							type="submit"
							className="btn btn-primary text-white"
							form="couponModalForm"
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
