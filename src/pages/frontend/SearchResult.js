import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { getAllProducts } from '../../api/front'
import Side from '../../components/frontend/products/Side'
import ProductCard from '../../components/frontend/ProductCard'

const SearchResult = () => {
	const [searchParams] = useSearchParams()
	const [products, setProducts] = useState([])
	const navigate = useNavigate()

	const searchString = searchParams.get('query')

	useEffect(() => {
		const getFilteredProduct = async () => {
			const res = await getAllProducts()
			setProducts(
				res.products.filter((item) => item.title.includes(searchString))
			)
		}
		getFilteredProduct()
	}, [searchString])

	return (
		<>
			<div className="container mt-4">
				<div className="row">
					<div className="col-md-3">
						<Side />
					</div>
					<div className="col-md-9">
						<p className="mb-2">
							關鍵字 {searchString} ，找到 {products.length} 筆商品
						</p>
						<hr />
						<div className="row">
							{products.map((item) => {
								return <ProductCard item={item} key={item.id} />
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
