import { useEffect, useState, useRef, useCallback } from 'react'
import { Modal } from 'bootstrap'
import { getCoupons, deleteCoupon } from '../../api/admin'
import CouponModal from '../../components/admin/CouponModal'
import Pagination from '../../components/Pagination'
import Spinner from '../../components/Spinner'
import { DeleteConfirmation, Confirmation } from '../../utils/toast-helper'
import { todayUnix, unixToDateString } from '../../utils/dayjs-helper'
import { Toast } from '../../utils/toast-helper'
import { useAuth } from '../../context/AuthContext'

const AdminCoupons = () => {
	const [coupons, setCoupons] = useState([])
	const [pagination, setPagination] = useState({})
	const [modalData, setModalData] = useState({})
	const [isLoading, setIsLoading] = useState(false)
	const couponModal = useRef(null)
	const { logout } = useAuth()

	const getCouponList = useCallback(
		async (page = 1) => {
			setIsLoading(true)
			try {
				const res = await getCoupons(page)
				setCoupons(res.data?.coupons)
				setPagination(res.data?.pagination)
			} catch (error) {
				if (error.response.status === 401) {
					// api path unauthorized
					logout()
				} else {
					setCoupons([])
					setPagination({})
					Toast.fire({ icon: 'error', title: '取得資料發生錯誤' })
				}
			} finally {
				setIsLoading(false)
			}
		},
		[logout]
	)

	const handleShowModal = (modalData) => {
		setModalData(modalData)
		couponModal.current.show()
	}
	const handleHideModal = () => {
		couponModal.current.hide()
	}

	const handleDelete = async (id) => {
		const { isConfirmed } = await DeleteConfirmation.fire()
		if (isConfirmed) {
			try {
				await deleteCoupon(id)
				Confirmation.fire({ title: '資料已刪除' })
				getCouponList()
			} catch (error) {
				Toast.fire({ icon: 'error', title: '資料刪除發生錯誤' })
			}
		}
	}

	useEffect(() => {
		couponModal.current = new Modal('#couponModal', {
			backdrop: 'static',
			keyboard: false,
		})
		getCouponList()
	}, [getCouponList])

	return (
		<div className="p-3">
			<Spinner isLoading={isLoading} />
			<CouponModal
				handleHideModal={handleHideModal}
				getCouponList={getCouponList}
				modalData={modalData}
			/>
			<h1 className="h3">優惠券列表</h1>
			<hr />
			<div className="text-end">
				<button
					type="button"
					className="btn btn-primary btn-sm text-white"
					onClick={() =>
						handleShowModal({
							title: '',
							percent: 100,
							code: '',
							due_date: todayUnix(),
							is_enabled: 0,
							action: 'create',
						})
					}
				>
					建立優惠券
				</button>
			</div>
			<table className="table">
				<thead>
					<tr>
						<th scope="col">標題</th>
						<th scope="col">折扣碼</th>
						<th scope="col">折數(%)</th>
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
								<td>{coupon.code}</td>
								<td>{coupon.percent}</td>
								<td>{unixToDateString(coupon.due_date)}</td>
								<td>{coupon.is_enabled ? '啟用' : '未啟用'}</td>
								<td>
									<button
										type="button"
										className="btn btn-primary btn-sm text-white me-2"
										onClick={() =>
											handleShowModal({ ...coupon, action: 'edit' })
										}
									>
										編輯
									</button>
									<button
										type="button"
										className="btn btn-outline-danger btn-sm"
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
