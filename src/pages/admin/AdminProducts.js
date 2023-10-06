import { useEffect, useState, useRef } from 'react'
import { Modal } from 'bootstrap'
import { getProducts, deleteProduct } from '../../api/admin'
import ProductModal from '../../components/admin/ProductModal'
import Pagination from '../../components/Pagination'
import { DeleteConfirmation, Confirmation } from '../../utils/toast-helper'

const AdminProducts = () => {
	const [products, setProducts] = useState([])
	const [pagination, setPagination] = useState({})
	const [modalAction, setModalAction] = useState('create') // or 'edit'
	const [modalData, setModalData] = useState({})
	const productModal = useRef(null)

	const getProductList = async (page = 1) => {
		const data = await getProducts(page)
		setProducts(data.products)
		setPagination(data.pagination)
	}
	const handleShowProductModal = (modalAction, modalData) => {
		setModalAction(modalAction)
		setModalData(modalData)
		productModal.current.show()
	}
	const handleHideProductModal = () => {
		productModal.current.hide()
	}

	const handleDeleteProduct = async (id) => {
		const { isConfirmed } = await DeleteConfirmation.fire()
		if (isConfirmed) {
			const result = await deleteProduct(id)
			if (result?.success) {
				Confirmation.fire({ title: '資料已刪除' })
				getProductList()
			}
		}
	}

	useEffect(() => {
		productModal.current = new Modal('#productModal', {
			backdrop: 'static',
			keyboard: false,
		})
		getProductList()
	}, [])

	return (
		<div className="p-3">
			<ProductModal
				handleHideProductModal={handleHideProductModal}
				getProductList={getProductList}
				modalAction={modalAction}
				modalData={modalData}
			/>
			<h1 className="h3">產品列表</h1>
			<hr />
			<div className="text-end">
				<button
					type="button"
					className="btn btn-primary btn-sm"
					onClick={() => handleShowProductModal('create', {})}
				>
					建立新商品
				</button>
			</div>
			<table className="table">
				<thead>
					<tr>
						<th scope="col">分類</th>
						<th scope="col">名稱</th>
						<th scope="col">價格</th>
						<th scope="col">狀態</th>
						<th scope="col">動作</th>
					</tr>
				</thead>
				<tbody>
					{products.map((product) => {
						return (
							<tr key={product.id}>
								<td>{product.category}</td>
								<td>{product.title}</td>
								<td>{product.price}</td>
								<td>{product.is_enabled ? '啟用' : '未啟用'}</td>
								<td>
									<button
										type="button"
										className="btn btn-primary btn-sm"
										onClick={() => handleShowProductModal('edit', product)}
									>
										編輯
									</button>
									<button
										type="button"
										className="btn btn-outline-danger btn-sm ms-2"
										onClick={() => handleDeleteProduct(product.id)}
									>
										刪除
									</button>
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
			<Pagination pagination={pagination} getDataList={getProductList} />
		</div>
	)
}

export default AdminProducts
