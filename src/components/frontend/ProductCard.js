import { Link } from 'react-router-dom'

const ProductCard = ({ item }) => {
	return (
		<div className="card border-0 mb-4 position-relative px-2 el-hover">
			<Link to={`/detail/${item?.id}`}>
				<img
					src={item?.imageUrl}
					className="card-img-top rounded-2 object-fit-cover card-img-height"
					alt={item?.title}
				/>
			</Link>
			<div className="card-body p-0 mb-1">
				<Link
					className="text-reset text-decoration-none"
					to={`/detail/${item?.id}`}
				>
					<h4 className="mb-0 mt-4 fs-5 card-text-min-height">{item?.title}</h4>
					<div className="d-block mt-2">
						<div className="align-text-bottom">
							<p className="card-text fs-5 mb-1 mb-lg-0 d-inline">
								NT$ {`${item?.price} `}
							</p>
							<small className="text-decoration-line-through text-secondary d-inline">
								NT$ {item?.origin_price}
							</small>
						</div>
					</div>
				</Link>
			</div>
		</div>
	)
}

export default ProductCard
