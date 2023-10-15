import React from 'react'
import { Link } from 'react-router-dom'
import ProductCarousel from './ProductCarousel'

const ProductCarouselCollection = ({ allData }) => {
	return (
		<>
			{allData?.map((data) => {
				return (
					<div className="container mt-5" key={data.id}>
						<h4 className="fs-4">
							{data?.products[0]?.category}
							<Link
								className="float-end btn btn-outline-dark"
								to={`/products/${data.id}`}
							>
								看更多
							</Link>
						</h4>
						<hr />
						<ProductCarousel data={data} />
					</div>
				)
			})}
		</>
	)
}

export default ProductCarouselCollection
