import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductsCat } from '../../api/front'
import productData from '../../utils/selectOptions.json'
import Pagination from '../../components/Pagination'
import Side from '../../components/frontend/products/Side'
import ProductCard from '../../components/frontend/ProductCard'

const Products = () => {
	const { categoryId } = useParams()
	const [products, setProducts] = useState([])
	const [pagination, setPagination] = useState({})

	const getDataList = async (page = 1, category = '新鮮蔬菜') => {
		const res = await getProductsCat(page, category)
		setProducts(res.products)
		setPagination(res.pagination)
	}

	useEffect(() => {
		const categoryTitle = productData.productCategories.find(
			(item) => item.id === Number(categoryId)
		).title
		getDataList(1, categoryTitle)
	}, [categoryId])

	return (
		<>
			<div className="container mt-4">
				<div className="row">
					<div className="col-md-3">
						<Side />
					</div>
					<div className="col-md-9">
						<div className="row">
							{products.map((item) => {
								return (
									<div className="col-6 col-lg-4" key={item.id}>
										<ProductCard item={item} />
									</div>
								)
							})}
							<div className="d-flex justify-content-center">
								<Pagination pagination={pagination} getDataList={getDataList} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Products
