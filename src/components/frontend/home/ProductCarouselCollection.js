import React from 'react'
import { Link } from 'react-router-dom'
import ProductCarousel from './ProductCarousel'

const ProductCarouselCollection = ({ allData }) => {
	return (
		<>
			{allData?.map((data) => {
				return (
					<div className="container mt-5" key={data.id}>
						<div className="d-flex mx-2 justify-content-between">
							<h4 className="mb-0 w-100">
								<Link
									className="text-reset text-decoration-none el-hover"
									to={`/products/${data.id}`}
								>
									{data?.products[0]?.category}
								</Link>
								<Link className="btn float-end" to={`/products/${data.id}`}>
									查看更多
								</Link>
							</h4>
						</div>
						<hr className="mx-2 mt-1" />
						<ProductCarousel data={data} />
					</div>
				)
			})}
		</>
	)
}

export default ProductCarouselCollection
