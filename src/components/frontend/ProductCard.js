import { Link, useOutletContext } from 'react-router-dom'
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { postCart } from '../../api/front'
import { Toast } from '../../utils/toast-helper'

const ProductCard = ({ item }) => {
	const { getCurrentCart } = useOutletContext()
	const handleAddCart = async (id) => {
		const res = await postCart({ data: { product_id: id, qty: 1 } })
		if (res.success) {
			Toast.fire({ icon: 'success', title: res.message })
		} else {
			Toast.fire({
				icon: 'error',
				title: res.message || '發生錯誤，請重新整理再試一次',
			})
		}
		getCurrentCart()
	}

	return (
		<div className="card border-0 mb-4 position-relative px-2">
			<Link to={`/detail/${item?.id}`}>
				<img
					src={item?.imageUrl}
					className="card-img-top rounded-2 el-hover object-fit-cover card-img-height"
					alt={item?.title}
				/>
			</Link>
			<div className="card-body p-0">
				<Link
					className="text-reset text-decoration-none el-hover"
					to={`/detail/${item?.id}`}
				>
					<h4 className="mb-0 mt-4 fs-5 card-text-min-height">{item?.title}</h4>
				</Link>
				<div className="d-block mt-2">
					<div className="align-text-bottom">
						<p className="card-text fs-5 mb-1 mb-lg-0 d-inline">
							NT$ {`${item?.price} `}
						</p>
						<small className="fs-6 text-decoration-line-through text-secondary d-inline">
							NT$ {item?.origin_price}
						</small>
					</div>

					<div className="text-end card-button-container">
						<button
							type="button"
							className="btn btn-primary text-white text-nowrap"
							onClick={() => handleAddCart(item.id)}
						>
							加入菜籃
							<FontAwesomeIcon icon={faBasketShopping} className="ms-1" />
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProductCard
