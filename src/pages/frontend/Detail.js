import { useEffect, useState } from 'react'
import { Link, useParams, useOutletContext } from 'react-router-dom'
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ProductCarousel from '../../components/frontend/home/ProductCarousel'
import SocialMedia from '../../components/frontend/home/SocialMedia'
import { getProductDetail, getProductsCat, postCart } from '../../api/front'
import AmountInput from '../../components/frontend/AmountInput'
import productData from '../../assets/selectOptions.json'
import { Toast } from '../../utils/toast-helper'
import Instruction from '../../components/frontend/products/Instruction'

const Detail = () => {
	const [product, setProduct] = useState({})
	const [productList, setProductList] = useState([])
	const [categoryId, setCategoryId] = useState(1)
	const [qty, setQty] = useState(1)
	const [isLoading, setIsLoading] = useState(false)
	const { id } = useParams()
	const { getCurrentCart } = useOutletContext()

	const getData = async (id) => {
		const data = await getProductDetail(id)
		const dataList = await getProductsCat(1, data.product.category)
		setProduct(data.product)
		setProductList(dataList.products)
		setCategoryId(
			productData.productCategories.find(
				(item) => item.title === data.product.category
			).id
		)
	}

	const handleAddCart = async () => {
		setIsLoading(true)
		const res = await postCart({ data: { product_id: id, qty } })
		if (res.success) {
			Toast.fire({ icon: 'success', title: res.message })
		}
		getCurrentCart()
		setIsLoading(false)
	}

	const handleAdd = () => {
		setQty(qty + 1)
	}

	const handleMinus = () => {
		qty > 1 && setQty(qty - 1)
	}
	useEffect(() => {
		getData(id)
	}, [id])

	return (
		<>
			<div className="container">
				<div className="row align-items-center mt-4">
					<div className="col-md-7">
						<img src={product?.imageUrl} className="d-block w-100" alt="..." />
					</div>
					<div className="col-md-5">
						<nav aria-label="breadcrumb">
							<ol className="breadcrumb bg-white px-0 mb-0 py-3">
								<li className="breadcrumb-item">
									<Link className="text-muted" to="/">
										首頁
									</Link>
								</li>
								<li className="breadcrumb-item">
									<Link
										className="text-muted"
										to={`/products/${categoryId}`}
									>
										{product?.category}
									</Link>
								</li>
								<li className="breadcrumb-item active" aria-current="page">
									{product?.title}
								</li>
							</ol>
						</nav>
						<h2 className="fw-bold mb-1">{product?.title}</h2>
						<p className="mb-0 text-muted text-end">
							<del>NT${product?.origin_price}</del>
						</p>
						<p className="h4 fw-bold text-end">NT${product?.price}</p>
						<div className="row align-items-center">
							<div className="col-6">
								<AmountInput
									qty={qty}
									handleAdd={handleAdd}
									handleMinus={handleMinus}
								/>
							</div>
							<div className="col-6">
								<button
									className="text-nowrap btn btn-outline-danger w-100 py-2"
									onClick={handleAddCart}
									disabled={isLoading}
								>
									加入菜籃
									<FontAwesomeIcon icon={faBasketShopping} className="ms-1" />
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="row my-5">
					<div className="col-md-7">
						<h5 className="text-decoration-underline">商品簡介</h5>
						<p>{product?.description}</p>
						<br />
						<h5 className="text-decoration-underline">商品說明</h5>
						{product?.content?.split('\n').map((item, i) => (
							<p key={i}>{item}</p>
						))}
					</div>
					<div className="col-md-5">
						<h5 className="mb-3 text-decoration-underline">訂購須知</h5>
						<Instruction />
					</div>
				</div>
				<hr />
				<h4>同類商品推薦</h4>
				<ProductCarousel data={{ id: categoryId, products: productList }} />
			</div>
			<div className="bg-light">
				<SocialMedia />
			</div>
		</>
	)
}

export default Detail
