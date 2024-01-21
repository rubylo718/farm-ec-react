import { useEffect, useState, useRef, useCallback } from 'react'
import { Modal } from 'bootstrap'
import { getOrders, deleteOrder } from '../../api/admin'
import OrderModal from '../../components/admin/OrderModal'
import Pagination from '../../components/Pagination'
import Spinner from '../../components/Spinner'
import { unixToDateString } from '../../utils/dayjs-helper'
import {
	Toast,
	DeleteConfirmation,
	Confirmation,
} from '../../utils/toast-helper'
import { useAuth } from '../../context/AuthContext'

const AdminOrders = () => {
	const [orders, setOrders] = useState([])
	const [pagination, setPagination] = useState({})
	const [modalData, setModalData] = useState({})
	const [isLoading, setIsLoading] = useState(false)
	const orderModal = useRef(null)
	const { logout } = useAuth()

	const getOrderList = useCallback(
		async (page = 1) => {
			setIsLoading(true)
			try {
				const res = await getOrders(page)
				setOrders(res.data?.orders)
				setPagination(res.data?.pagination)
			} catch (error) {
				if (error.response.status === 401) {
					// api path unauthorized
					logout()
				} else {
					setOrders([])
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
		orderModal.current.show()
	}
	const handleHideModal = () => {
		orderModal.current.hide()
	}

	const handleDeleteOrder = async (id) => {
		const { isConfirmed } = await DeleteConfirmation.fire()
		if (isConfirmed) {
			try {
				await deleteOrder(id)
				Confirmation.fire({ title: '資料已刪除' })
				getOrderList()
			} catch (error) {
				Toast.fire({ icon: 'error', title: '發生錯誤，請再試一次' })
			}
		}
	}

	useEffect(() => {
		orderModal.current = new Modal('#orderModal', {
			backdrop: 'static',
			keyboard: false,
		})
		getOrderList()
	}, [getOrderList])

	return (
		<div className="p-3">
			<Spinner isLoading={isLoading} />
			<OrderModal
				handleHideModal={handleHideModal}
				getOrderList={getOrderList}
				modalData={modalData}
			/>
			<h1 className="h3">訂單列表</h1>
			<hr />
			<table className="table">
				<thead>
					<tr>
						<th scope="col">訂單日期</th>
						<th scope="col">訂單ID</th>
						<th scope="col">訂單總金額</th>
						<th scope="col">付款狀態</th>
						<th scope="col">付款日期</th>
						<th scope="col">動作</th>
					</tr>
				</thead>
				<tbody>
					{orders.map((order) => {
						return (
							<tr key={order.id}>
								<td>{unixToDateString(order.create_at)}</td>
								<td>{order.id}</td>

								<td>NT$ {Math.round(order.total)}</td>
								<td>{order.is_paid ? '完成' : '未完成'}</td>
								<td>
									{order.is_paid
										? unixToDateString(order.paid_date)
										: '尚未付款'}
								</td>
								<td>
									<button
										type="button"
										className="btn btn-primary btn-sm text-white me-1"
										onClick={() => handleShowModal(order)}
									>
										查看
									</button>
									<button
										type="button"
										className="btn btn-outline-danger btn-sm"
										onClick={() => handleDeleteOrder(order.id)}
									>
										刪除
									</button>
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
			<Pagination pagination={pagination} getDataList={getOrderList} />
		</div>
	)
}

export default AdminOrders
