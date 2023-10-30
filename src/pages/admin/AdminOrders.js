import { useEffect, useState, useRef } from 'react'
import { Modal } from 'bootstrap'
import { getOrders } from '../../api/admin'
import OrderModal from '../../components/admin/OrderModal'
import Pagination from '../../components/Pagination'
import { unixToDateString } from '../../utils/dayjs-helper'

const AdminOrders = () => {
	const [orders, setOrders] = useState([])
	const [pagination, setPagination] = useState({})
	const [modalData, setModalData] = useState({})
	const orderModal = useRef(null)

	const getOrderList = async (page = 1) => {
		const data = await getOrders(page)
		setOrders(data?.orders)
		setPagination(data?.pagination)
	}
	const handleShowModal = (modalData) => {
		setModalData(modalData)
		orderModal.current.show()
	}
	const handleHideModal = () => {
		orderModal.current.hide()
	}

	useEffect(() => {
		orderModal.current = new Modal('#orderModal', {
			backdrop: 'static',
			keyboard: false,
		})
		getOrderList()
	}, [])

	return (
		<div className="p-3">
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
						<th scope="col">訂單ID</th>
						<th scope="col">訂單日期</th>
						<th scope="col">訂購姓名</th>
						<th scope="col">付款狀態</th>
						<th scope="col">動作</th>
					</tr>
				</thead>
				<tbody>
					{orders.map((order) => {
						return (
							<tr key={order.id}>
								<td>{order.id}</td>
								<td>{unixToDateString(order.create_at)}</td>
								<td>{order.user.name}</td>
								<td>{order.is_paid ? '付款完成' : '未付款'}</td>

								<td>
									<button
										type="button"
										className="btn btn-primary btn-sm"
										onClick={() => handleShowModal(order)}
									>
										查看
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
