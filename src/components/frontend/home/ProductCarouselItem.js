import { Link } from 'react-router-dom'
import ProductCard from '../ProductCard'

const ProductCarouselItem = ({ productList, categoryId }) => {
	return (
		<>
			<div className="carousel-item active">
				<div className="row">
					<ProductCard item={productList[0]} />
					<ProductCard item={productList[1]} />
					<ProductCard item={productList[2]} />
				</div>
			</div>
			<div className="carousel-item">
				<div className="row">
					<ProductCard item={productList[3]} />
					<ProductCard item={productList[4]} />
					<div className="col-md-4 mt-md-2">
						<div className="card border-0 align-items-center">
							<div className="card-body my-5 ">
								<Link className="text-decoration-none text-secondary fs-2 text-center p-4 border rounded-pill" to={`/products/${categoryId}`}>
									完整列表
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default ProductCarouselItem
