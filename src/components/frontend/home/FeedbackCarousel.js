import { useEffect, useRef } from 'react'
import { Carousel } from 'bootstrap'
import FeedbackCarouselItem from './FeedbackCarouselItem'

const FeedbackCarousel = ({ feedback }) => {
	const feedbackCarousel = useRef(null)

	const handleNext = () => {
		feedbackCarousel.current.next()
	}
	const handlePrev = () => {
		feedbackCarousel.current.prev()
	}

	const handleTo = (i) => {
		feedbackCarousel.current.to(i)
	}

	useEffect(() => {
		feedbackCarousel.current = new Carousel('#feedbackCarouselControls')
	})

	return (
		<div className="container my-5">
			<div
				id="feedbackCarouselControls"
				className="carousel slide"
				data-ride="carousel"
			>
				<div className="carousel-indicators">
					<button
						type="button"
						data-bs-target="#carouselExampleIndicators"
						data-bs-slide-to="0"
						className="active"
						aria-current="true"
						aria-label="Slide 1"
						onClick={() => handleTo(0)}
					></button>
					<button
						type="button"
						data-bs-target="#carouselExampleIndicators"
						data-bs-slide-to="1"
						aria-label="Slide 2"
						onClick={() => handleTo(1)}
					></button>
					<button
						type="button"
						data-bs-target="#carouselExampleIndicators"
						data-bs-slide-to="2"
						aria-label="Slide 3"
						onClick={() => handleTo(2)}
					></button>
				</div>
				<div className="carousel-inner">
					<FeedbackCarouselItem feedback={feedback} />
				</div>
				<button className="carousel-control-prev" onClick={handlePrev}>
					<span
						className="carousel-control-prev-icon"
						aria-hidden="true"
					></span>
					<span className="sr-only">Previous</span>
				</button>
				<button className="carousel-control-next" onClick={handleNext}>
					<span
						className="carousel-control-next-icon"
						aria-hidden="true"
					></span>
					<span className="sr-only">Next</span>
				</button>
			</div>
		</div>
	)
}

export default FeedbackCarousel
