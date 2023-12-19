import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { getProductsCat } from '../../api/front'
import productData from '../../assets/selectOptions.json'
import Pagination from '../../components/Pagination'
import Side from '../../components/frontend/products/Side'
import ProductCard from '../../components/frontend/ProductCard'
import Spinner from '../../components/Spinner'

const Products = () => {
	const { categoryId } = useParams()
	const [products, setProducts] = useState([])
	const [pagination, setPagination] = useState({})
	const [isLoading, setIsLoading] = useState(false)

	const getDataList = useCallback(
		async (page) => {
			setIsLoading(true)
			const categoryTitle = productData.productCategories.find(
				(item) => item.id === Number(categoryId)
			)?.title
			const res = await getProductsCat(page, categoryTitle)
			setProducts(res.products)
			setPagination(res.pagination)
			setIsLoading(false)
		},
		[categoryId]
	)

	useEffect(() => {
		getDataList()
	}, [categoryId, getDataList])

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [products])

	return (
		<>
			<div className="container mt-4">
				<Spinner isLoading={isLoading} />
				<div className="row">
					<div className="col-md-3">
						<Side />
					</div>
					<div className="col-md-9">
						<div className="row">
							{products?.map((item) => {
								return (
									<div className="col-sm-6 col-lg-4 px-0" key={item.id}>
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
