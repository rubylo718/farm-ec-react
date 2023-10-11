const Story = () => {
	return (
		<div className="container my-5">
			<div className="row">
				<h4 className="fs-4">
					產地故事
					<a className="float-end btn btn-outline-dark" href="/">
						看更多
					</a>
				</h4>
				<hr />
				{[...Array(3)].map((item, index) => {
					return (
						<div className="col-md-4 mt-md-2" key={index}>
							<div className="card border-0 mb-4 position-relative position-relative">
								<img
									src="https://images.unsplash.com/photo-1533808510407-976bfd509dc2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"
									className="card-img-top rounded-0"
									alt="..."
									style={{ height: '150px', objectFit: 'cover' }}
								/>
								<div className="card-body p-0">
									<h4 className="mb-0 mt-4">Lorem ipsum</h4>
									<div className="d-flex justify-content-between mt-3">
										<p className="card-text text-muted mb-0">
											Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
											sed diam nonumy eirmod tempor invidunt ut labore et dolore
											magna.
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
