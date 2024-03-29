import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { getProductsCat } from '../../api/front'
import productData from '../../assets/selectOptions.json'
import Pagination from '../../components/Pagination'
import Side from '../../components/frontend/products/Side'
import ProductCard from '../../components/frontend/ProductCard'
import Spinner from '../../components/Spinner'
import { Toast } from '../../utils/toast-helper'

const Products = () => {
	const { categoryId } = useParams()
	const [products, setProducts] = useState([])
	const [pagination, setPagination] = useState({})
	const [isLoading, setIsLoading] = useState(false)

	const getDataList = useCallback(
		async (page) => {
			setIsLoading(true)
			try {
				const categoryTitle = productData.productCategories.find(
					(item) => item.id === Number(categoryId)
				)?.title
				const res = await getProductsCat(page, categoryTitle)
				setProducts(res.data?.products)
				setPagination(res.data?.pagination)
			} catch (error) {
				Toast.fire({ icon: 'error', title: '取得資料發生錯誤' })
			} finally {
				setIsLoading(false)
			}
		},
		[categoryId]
	)

	useEffect(() => {
		getDataList()
	}, [categoryId, getDataList])

	return (
		<>
			<div className="container my-5">
				<Spinner isLoading={isLoading} />
				<div className="row">
					<div className="col-md-3">
						<Side />
					</div>
					<div className="col-md-9">
						<div className="row">
							{products?.map((item) => {
								return (
									<div className="col-6 col-lg-4 px-0" key={item.id}>
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
