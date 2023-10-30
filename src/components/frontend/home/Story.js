import { Link } from "react-router-dom"

const Story = ({ stories }) => {
	return (
		<div className="container my-5">
			<div className="row">
				<h4 className="fs-4">
					產地故事
					<Link className="float-end btn btn-outline-dark" to="blog">
						看更多
					</Link>
				</h4>
				<hr />
				{stories.map((item) => {
					return (
						<div className="col-md-4 mt-md-2" key={item.id}>
							<div className="card border-0 mb-4 position-relative position-relative">
								<img
									src={item.image}
									className="card-img-top rounded-0"
									alt="..."
									style={{ height: '150px', objectFit: 'cover' }}
								/>
								<div className="card-body p-0">
									<h4 className="mb-0 mt-4">{item.title}</h4>
									<div className="d-flex justify-content-between mt-3">
										<p className="card-text text-muted mb-0">
											{item.description}
										</p>
									</div>
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Story
