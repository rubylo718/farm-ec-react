import { useContext } from 'react'
import { ProductContext } from '../../../context/ProductContext'

import ProductCard from '../ProductCard'

const ProductCarouselItem = () => {
	const products = useContext(ProductContext)

	return (
		<>
			<div className="carousel-item active">
				<div className="row">
					<ProductCard item={products[0]}/>
					<ProductCard item={products[1]}/>
					<ProductCard item={products[2]}/>
				</div>
			</div>
			<div className="carousel-item">
				<div className="row">
				  <ProductCard item={products[3]}/>
					<ProductCard item={products[4]}/>
					<div className="col-md-4 mt-md-2">
						<div className="card border-0 align-items-center">
							<div className="card-body my-5 ">
								<span className="fs-2 text-center p-4 border rounded-pill ">
									完整列表
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default ProductCarouselItem
