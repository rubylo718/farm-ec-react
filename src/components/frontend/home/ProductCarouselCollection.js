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
							<Link
								className="text-reset text-decoration-none el-hover"
								to={`/products/${data.id}`}
							>
								{data?.products[0]?.category}
							</Link>
							<Link
								className="float-end btn btn-outline-dark"
								to={`/products/${data.id}`}
							>
								完整列表
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
