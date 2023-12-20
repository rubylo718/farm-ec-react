import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { getAllProducts } from '../../api/front'
import Side from '../../components/frontend/products/Side'
import ProductCard from '../../components/frontend/ProductCard'
import Spinner from '../../components/Spinner'

const SearchResult = () => {
	const [searchParams] = useSearchParams()
	const [products, setProducts] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const navigate = useNavigate()

	const searchString = searchParams.get('query')

	useEffect(() => {
		const getFilteredProduct = async () => {
			setIsLoading(true)
			const res = await getAllProducts()
			setProducts(
				res.products.filter((item) => item.title.includes(searchString))
			)
			setIsLoading(false)
		}
		getFilteredProduct()
	}, [searchString])

	return (
		<>
			<div className="container mt-4">
				<Spinner isLoading={isLoading} />
				<div className="row">
					<div className="col-md-3">
						<Side />
					</div>
					<div className="col-md-9">
						<p className="mb-2">
							關鍵字 {searchString} ，找到 {products.length} 筆商品
						</p>
						<hr />
						{products?.length ? (
							''
						) : (
							<p>
								很抱歉，查無 {searchString} 的相關商品，您可以調整關鍵字再試試看
							</p>
						)}

						<div className="row">
							{products.map((item) => {
								return (
									<div className="col-6 col-lg-4" key={item.id}>
										<ProductCard item={item} />
									</div>
								)
							})}
						</div>
						<button
							type="button"
							className="btn btn-primary mb-4 text-white"
							onClick={() => navigate('/')}
						>
							回首頁
						</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default SearchResult
