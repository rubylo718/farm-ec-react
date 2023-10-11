import ProductCarouselItem from './ProductCarouselItem'

const ProductCarousel = () => {
	return (
		<div className='container mt-5'>
			<h4 className="fs-4">
				產品類型
				<a className="float-end btn btn-outline-dark" href="/">
					看更多
				</a>
			</h4>
			<hr />
			<div className="container">
				<div
					id="carouselExampleControls"
					className="carousel slide"
					data-ride="carousel"
				>
					<div className="carousel-inner">
						<ProductCarouselItem />
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
}

export default ProductCarousel
