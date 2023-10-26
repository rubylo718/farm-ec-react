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
