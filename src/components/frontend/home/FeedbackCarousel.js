import FeedbackCarouselItem from './FeedbackCarouselItem'

const FeedbackCarousel = () => {
	return (
		<div className="container my-5">
			<div
				id="carouselExampleControls"
				className="carousel slide"
				data-ride="carousel"
			>
				<div className="carousel-inner">
					<FeedbackCarouselItem />
				</div>
				<a
					className="carousel-control-prev"
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
					className="carousel-control-next"
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
	)
}

export default FeedbackCarousel
