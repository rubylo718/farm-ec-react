import { useEffect, useRef } from 'react'
import { Carousel } from 'bootstrap'
import { Link } from 'react-router-dom'
import ProductCarouselItem from './ProductCarouselItem'

const ProductCarousel = ({ data }) => {
	const catOneCarousel = useRef(null)
	const catTwoCarousel = useRef(null)
	const catThreeCarousel = useRef(null)

	const handleNext = (carouselId) => {
		switch (carouselId) {
			case 1:
				catOneCarousel.current.next()
				break
			case 2:
				catTwoCarousel.current.next()
				break
			case 3:
				catThreeCarousel.current.next()
				break
			default:
				break
		}
	}

	const handlePrev = (carouselId) => {
		switch (carouselId) {
			case 1:
				catOneCarousel.current.prev()
				break
			case 2:
				catTwoCarousel.current.prev()
				break
			case 3:
				catThreeCarousel.current.prev()
				break
			default:
				break
		}
	}

	useEffect(() => {
		catOneCarousel.current = new Carousel(`#carouselControls${data[0].id}`)
		catTwoCarousel.current = new Carousel(`#carouselControls${data[1].id}`)
		catThreeCarousel.current = new Carousel(`#carouselControls${data[2].id}`)
	}, [data])

	return (
		<>
			{data?.map((d, index) => {
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
								id={`carouselControls${d.id}`}
								className="carousel slide"
								data-ride="carousel"
							>
								<div className="carousel-inner">
									<ProductCarouselItem
										productList={d?.products}
										categoryId={d?.id}
									/>
								</div>
								<button
									className="carousel-control-prev" style={{width: "48px", height:"48px", top:"40%", left:"-10%"}}
									data-slide="prev"
									onClick={()=> handlePrev(d?.id)}
								>
									<span
										className="carousel-control-prev-icon"
										aria-hidden="true"
									></span>
									<span className="sr-only">Previous</span>
								</button>
								<button
									className="carousel-control-next" style={{width: "48px", height:"48px", top:"40%", right:"-10%"}}
									data-slide="next"
									onClick={() => handleNext(d?.id)}
								>
									<span
										className="carousel-control-next-icon"
										aria-hidden="true"
									></span>
									<span className="sr-only">Next</span>
								</button>
							</div>
						</div>
					</div>
				)
			})}
		</>
	)
}

export default ProductCarousel
