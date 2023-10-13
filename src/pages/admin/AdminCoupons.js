import { useEffect, useState, useRef } from 'react'
import { Modal } from 'bootstrap'
import { getCoupons, deleteCoupon } from '../../api/admin'
import CouponModal from '../../components/admin/CouponModal'
import Pagination from '../../components/Pagination'
import { DeleteConfirmation, Confirmation } from '../../utils/toast-helper'
import { unixToDateString } from '../../utils/dayjs-helper'

const AdminCoupons = () => {
	const [coupons, setCoupons] = useState([])
	const [pagination, setPagination] = useState({})
	const [modalAction, setModalAction] = useState('create') // or 'edit'
	const [modalData, setModalData] = useState({})
	const couponModal = useRef(null)

	const getCouponList = async (page = 1) => {
		const data = await getCoupons(page)
		setCoupons(data?.coupons)
		setPagination(data?.pagination)
	}
	const handleShowModal = (modalAction, modalData) => {
		setModalAction(modalAction)
		setModalData(modalData)
		couponModal.current.show()
	}
	const handleHideModal = () => {
		couponModal.current.hide()
	}

	const handleDelete = async (id) => {
		const { isConfirmed } = await DeleteConfirmation.fire()
		if (isConfirmed) {
			const result = await deleteCoupon(id)
			if (result?.success) {
				Confirmation.fire({ title: '資料已刪除' })
				getCouponList()
			}
		}
	}

	useEffect(() => {
		couponModal.current = new Modal('#couponModal', {
			backdrop: 'static',
			keyboard: false,
		})
		getCouponList()
	}, [])

	return (
		<div className="p-3">
			<CouponModal
				handleHideModal={handleHideModal}
				getCouponList={getCouponList}
				modalAction={modalAction}
				modalData={modalData}
			/>
			<h1 className="h3">優惠券列表</h1>
			<hr />
			<div className="text-end">
				<button
					type="button"
					className="btn btn-primary btn-sm"
					onClick={() => handleShowModal('create', {})}
				>
					建立優惠券
				</button>
			</div>
			<table className="table">
				<thead>
					<tr>
						<th scope="col">標題</th>
						<th scope="col">折數</th>
						<th scope="col">到期日</th>
						<th scope="col">狀態</th>
						<th scope="col">動作</th>
					</tr>
				</thead>
				<tbody>
					{coupons.map((coupon) => {
						return (
							<tr key={coupon.id}>
								<td>{coupon.title}</td>
								<td>{coupon.percent}</td>
								<td>{unixToDateString(coupon.due_date)}</td>
								<td>{coupon.is_enabled ? '啟用' : '未啟用'}</td>
								<td>
									<button
										type="button"
										className="btn btn-primary btn-sm"
										onClick={() => handleShowModal('edit', coupon)}
									>
										編輯
									</button>
									<button
										type="button"
										className="btn btn-outline-danger btn-sm ms-2"
										onClick={() => handleDelete(coupon.id)}
									>
										刪除
									</button>
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
			<Pagination pagination={pagination} getDataList={getCouponList} />
		</div>
	)
}

export default AdminCoupons
