import { useEffect, useState } from 'react'
import { getProducts } from '../../api/admin'

const AdminProducts = () => {
	const [products, setProducts] = useState([])

	useEffect(() => {
		const getProductList = async () => {
			const data = await getProducts()
			setProducts(data.products)
		}
		getProductList()
	}, [])

	return (
		<div className="p-3">
			<h1 className="h3">產品列表</h1>

			<hr />
			<div className="text-end">
				<button type="button" className="btn btn-primary btn-sm">
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
									<button type="button" className="btn btn-primary btn-sm">
										編輯
									</button>
									<button
										type="button"
										className="btn btn-outline-danger btn-sm ms-2"
									>
										刪除
									</button>
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>

			<nav aria-label="Page navigation">
				<ul className="pagination">
					<li className="page-item disabled">
						<a className="page-link" href="/" aria-label="Previous">
							<span aria-hidden="true">&laquo;</span>
						</a>
					</li>
					<li className="page-item active" aria-current="page">
						<a className="page-link" href="/">
							1
						</a>
					</li>
					<li className="page-item">
						<a className="page-link" href="/">
							2
						</a>
					</li>
					<li className="page-item">
						<a className="page-link" href="/">
							3
						</a>
					</li>
					<li className="page-item">
						<a className="page-link" href="/" aria-label="Next">
							<span aria-hidden="true">&raquo;</span>
						</a>
					</li>
				</ul>
			</nav>
		</div>
	)
}

export default AdminProducts
