const FeedbackCarouselItem = ({ feedback }) => {
	return (
		<>
			{feedback.map((item) => {
				return (
					<div
						className={`carousel-item ${item.id === 1 && 'active'}`}
						key={item.id}
					>
						<div className="row justify-content-center py-5">
							<div className="col-md-8 d-flex">
								<img
									src={item.photoUrl}
									alt={item.last_name + item.title}
									className="rounded-circle me-5 el-hover"
									style={{
										width: '160px',
										height: '160px',
										objectFit: 'cover',
									}}
								/>
								<div className="d-flex flex-column">
									<p className="h5 el-hover">“{item.content}”</p>
									<p className="mt-auto text-muted">
										{item.city} {item.last_name + item.title} {item.job}
									</p>
								</div>
							</div>
						</div>
					</div>
				)
			})}
		</>
	)
}

export default FeedbackCarouselItem