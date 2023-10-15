import { useEffect, useRef } from 'react'
import { Carousel } from 'bootstrap'
import ProductCarouselItem from './ProductCarouselItem'

const ProductCarousel = ({ data }) => {
	const catCarousel = useRef(null)

	const handleNext = () => {
		catCarousel.current.next()
	}
	const handlePrev = () => {
		catCarousel.current.prev()
	}

	useEffect(() => {
		catCarousel.current = new Carousel(`#carouselControls${data.id}`)
	}, [data])

	return (
		<>
			<div className="container">
				<div
					id={`carouselControls${data?.id}`}
					className="carousel slide"
					data-ride="carousel"
				>
					<div className="carousel-inner">
						<ProductCarouselItem
							productList={data?.products}
							categoryId={data?.id}
						/>
					</div>
					<button
						className="carousel-control-prev"
						style={{
							width: '48px',
							height: '48px',
							top: '40%',
							left: '-10%',
						}}
						data-slide="prev"
						onClick={handlePrev}
					>
						<span
							className="carousel-control-prev-icon"
							aria-hidden="true"
						></span>
						<span className="sr-only">Previous</span>
					</button>
					<button
						className="carousel-control-next"
						style={{
							width: '48px',
							height: '48px',
							top: '40%',
							right: '-10%',
						}}
						data-slide="next"
						onClick={handleNext}
					>
						<span
							className="carousel-control-next-icon"
							aria-hidden="true"
						></span>
						<span className="sr-only">Next</span>
					</button>
				</div>
			</div>
		</>
	)
}

export default ProductCarousel
