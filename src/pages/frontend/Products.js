import ProductCard from '../../components/frontend/ProductCard'
import Side from '../../components/frontend/products/Side'

const Products = () => {
	return (
		<>
			<div className="container mt-4">
				<div className="row">
					<div className="col-md-4">
            <Side />
					</div>
					<div className="col-md-8">
						<div className="row">
							<ProductCard />
							<ProductCard />
							<ProductCard />
							<ProductCard />
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Products
