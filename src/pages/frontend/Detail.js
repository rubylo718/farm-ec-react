import { useEffect, useState, useCallback } from 'react'
import {
	Link,
	useParams,
	useOutletContext,
	useNavigate,
} from 'react-router-dom'
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ProductCarousel from '../../components/frontend/home/ProductCarousel'
import SocialMedia from '../../components/frontend/home/SocialMedia'
import { getProductDetail, getProductsCat, postCart } from '../../api/front'
import AmountInput from '../../components/frontend/AmountInput'
import Spinner from '../../components/Spinner'
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
	const navigate = useNavigate()

	const getData = useCallback(
		async (id) => {
			setIsLoading(true)
			try {
				const productRes = await getProductDetail(id)
				const categoryRes = await getProductsCat(
					1,
					productRes.data.product.category
				)
				setProduct(productRes.data.product)
				setProductList(categoryRes.data.products)
				setCategoryId(
					productData.productCategories.find(
						(item) => item.title === productRes.data.product.category
					).id
				)
				setQty(1)
			} catch {
				Toast.fire({ icon: 'error', title: '取得資料發生錯誤，將返回前一頁' })
				setTimeout(() => {
					navigate(-1)
				}, 1500)
			} finally {
				setIsLoading(false)
			}
		},
		[navigate]
	)

	const handleAddCart = async () => {
		setIsLoading(true)
		try {
			await postCart({ data: { product_id: id, qty } })
			Toast.fire({ icon: 'success', title: '成功加入購物車' })
			getCurrentCart()
		} catch (error) {
			Toast.fire({ icon: 'error', title: '操作失敗，請重新整理再試一次' })
		} finally {
			setIsLoading(false)
		}
	}

	const handleAdd = () => {
		setQty(qty + 1)
	}

	const handleMinus = () => {
		qty > 1 && setQty(qty - 1)
	}

	useEffect(() => {
		getData(id)
	}, [getData, id])

	return (
		<>
			<div className="container">
				<Spinner isLoading={isLoading} />
				<div className="row align-items-center mt-4">
					<div className="col-md-7 mb-3">
						<nav aria-label="breadcrumb">
							<ol className="breadcrumb bg-white px-0 mb-0 py-3">
								<li className="breadcrumb-item">
									<Link className="text-muted" to="/">
										首頁
									</Link>
								</li>
								<li className="breadcrumb-item">
									<Link className="text-muted" to={`/products/${categoryId}`}>
										{product?.category}
									</Link>
								</li>
								<li className="breadcrumb-item active" aria-current="page">
									{product?.title}
								</li>
							</ol>
						</nav>
						<img
							src={product?.imageUrl}
							className="d-block w-100 rounded-2"
							alt={product.title}
						/>
					</div>
					<div className="col-md-5">
						<h2 className="fw-bold mb-3">{product?.title}</h2>
						<div className="align-text-bottom">
							<p className="fs-4 fw-bold d-inline me-2">NT$ {product?.price}</p>
							<small className="text-decoration-line-through text-secondary d-inline">
								NT$ {product?.origin_price}
							</small>
						</div>
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
									type="button"
									className="text-nowrap btn btn-primary text-white w-100 py-2"
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
						<h5 className="fw-bold mb-3">商品簡介</h5>
						<p>{product?.description}</p>
						<br />
						<h5 className="fw-bold mb-3">商品說明</h5>
						{product?.content?.split('\n').map((item, i) => (
							<p key={i} className="lh-lg">
								{item}
							</p>
						))}
					</div>
					<div className="col-md-5">
						<h5 className="fw-bold mb-3">訂購須知</h5>
						<Instruction />
					</div>
				</div>
				<hr className="my-4" />
				<h4 className="pb-3">
					同類商品推薦
					<Link className="btn float-end" to={`/products/${categoryId}`}>
						查看更多
					</Link>
				</h4>

				<ProductCarousel data={{ id: categoryId, products: productList }} />
			</div>
			<div className="bg-light">
				<SocialMedia />
			</div>
		</>
	)
}

export default Detail
