import { Link } from 'react-router-dom'
import ProductCarouselItem from './ProductCarouselItem'

const ProductCarousel = ({ data }) => {
	return (
		<>
			{data.map((d, index) => {
				return (
					<div className="container mt-5" key={d.id}>
						<h4 className="fs-4">
							{d?.products[index]?.category}
							<Link
								className="float-end btn btn-outline-dark"
								to={`/products/${d.id}`}
							>
								看更多
							</Link>
						</h4>
						<hr />
						<div className="container">
							<div
								id="carouselExampleControls"
								className="carousel slide"
								data-ride="carousel"
							>
								<div className="carousel-inner">
									<ProductCarouselItem
										productList={d?.products}
										categoryId={d?.id}
									/>
								</div>
								<a
									className="carousel-control-prev justify-content-start"
									href="#carouselExampleControls"
									role="button"
									data-slide="prev"
								>
									<span
										className="carousel-control-prev-icon"
										aria-hidden="true"
									></span>
									<span className="sr-only">Previous</span>
								</a>
								<a
									className="carousel-control-next  justify-content-end"
									href="#carouselExampleControls"
									role="button"
									data-slide="next"
								>
									<span
										className="carousel-control-next-icon"
										aria-hidden="true"
									></span>
									<span className="sr-only">Next</span>
								</a>
							</div>
						</div>
					</div>
				)
			})}
		</>
	)
}

export default ProductCarousel
