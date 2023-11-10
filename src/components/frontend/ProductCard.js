import { Link, useOutletContext } from 'react-router-dom'
import { postCart } from '../../api/front'
import { Toast } from '../../utils/toast-helper'

const ProductCard = ({ item }) => {
	const { getCurrentCart } = useOutletContext()
	const handleAddCart = async (id) => {
		const res = await postCart({ data: { product_id: id, qty: 1 } })
		if (res.success) {
			Toast.fire({ icon: 'success', title: res.message })
		}
		getCurrentCart()
	}

	return (
		<div className="card border-0 mb-4 position-relative position-relative">
			<Link to={`/detail/${item?.id}`}>
				<img
					src={item?.imageUrl}
					className="card-img-top rounded-0 el-hover"
					alt={item?.title}
					style={{ height: '20vh', objectFit: 'cover' }}
				/>
			</Link>
			<div className="card-body p-0">
				<Link
					className="text-reset text-decoration-none el-hover"
					to={`/detail/${item?.id}`}
				>
					<h4 className="mb-0 mt-4 fs-5" style={{ minHeight: '48px' }}>
						{item?.title}
					</h4>
				</Link>
				<div className="d-flex justify-content-between mt-2">
					<div className="align-text-bottom">
						<p className="card-text fs-5 mb-1 mb-lg-0 d-inline">${`${item?.price} `}</p>
						<small className="fs-6 text-decoration-line-through text-secondary d-inline">
							${item?.origin_price}
						</small>
					</div>

					<div className="text-end" style={{ minWidth: '120px' }}>
						<button className="btn btn-primary text-nowrap text-white me-1">
							<Link
								className="text-decoration-none text-reset"
								to={`/detail/${item?.id}`}
							>
								介紹
							</Link>
						</button>
						<button
							className="btn btn-outline-danger text-nowrap"
							onClick={() => handleAddCart(item.id)}
						>
							購買
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProductCard
