const FeedbackCarouselItem = () => {
	return (
		<div className="carousel-item active">
			<div className="row justify-content-center py-5">
				<div className="col-md-8 d-flex">
					<img
						src="https://images.unsplash.com/photo-1609220136736-443140cffec6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"
						alt=""
						className="rounded-circle me-5"
						style={{ width: '160px', height: '160px', objectFit: 'cover' }}
					/>
					<div className="d-flex flex-column">
						<p className="h5">
							“安心小農提供產品生產履歷標誌，讓我們全家吃的安心”
						</p>
						<p className="mt-auto text-muted">台北市 陳先生 上班族/二寶爸</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FeedbackCarouselItem
