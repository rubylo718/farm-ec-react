import ProductCard from '../ProductCard'

const ProductCarouselItem = () => {
	return (
		<>
			<div className="carousel-item active">
				<div className="row">
					<ProductCard/>
					<ProductCard/>
					<ProductCard/>
				</div>
			</div>
			<div className="carousel-item">
				<div className="row">
					{[...Array(2)].map((item, index) => {
						return (
							<div className="col-md-4 mt-md-2" key={index}>
								<div className="card border-0 mb-4 position-relative">
									<img
										src="https://images.unsplash.com/photo-1696446700369-58db7f7ab9bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2672&q=80"
										className="card-img-top rounded-0"
										alt="..."
									/>
									<div className="card-body p-0">
										<h4 className="mb-0 mt-4">產品名稱</h4>
										<div className="d-flex justify-content-between mt-3">
											<p className="card-text text-muted mb-0 w-75">產品說明</p>
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
					})}
					<div className="col-md-4 mt-md-2">
						<div className="card border-0 align-items-center">
							<div className="card-body my-5 ">
								<span className="fs-2 text-center p-4 border rounded-pill ">
									完整列表
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default ProductCarouselItem
