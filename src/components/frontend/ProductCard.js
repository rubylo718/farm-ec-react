const ProductCard = () => {
	return (
		<div className="col-md-4 mt-md-2">
			<div className="card border-0 mb-4 position-relative position-relative">
				<img
					src="https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"
					className="card-img-top rounded-0"
					alt="..."
				/>
				<div className="card-body p-0">
					<h4 className="mb-0 mt-4">產品名稱</h4>
					<div className="d-flex justify-content-between mt-3">
						<p className="card-text fs-5 mb-0 w-75">
							$100{' '}
							<small className="fs-6 text-decoration-line-through text-secondary">
								$120
							</small>
						</p>
						<button className="btn btn-outline-primary text-nowrap">
							介紹
						</button>
						<button className="btn btn-outline-danger text-nowrap ms-1">
							購買
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProductCard
