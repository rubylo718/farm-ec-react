import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getOrder } from '../../api/front'
import OrderInfo from '../../components/frontend/checkoutProcess/OrderInfo'
import DeliveryInfo from '../../components/frontend/checkoutProcess/DeliveryInfo'
import CheckoutProgress from '../../components/frontend/checkoutProcess/CheckoutProgress'
import { Toast } from '../../utils/toast-helper'

const CheckoutSuccess = () => {
	const { orderId } = useParams()
	const [orderData, setOrderData] = useState({})
	const navigation = useNavigate()

	useEffect(() => {
		const getOrderData = async (orderId) => {
			try {
				const result = await getOrder(orderId)
				setOrderData(result.data.order)
			} catch (error) {
				setOrderData({})
				Toast.fire({ icon: 'error', title: '取得資料發生錯誤' })
			}
		}
		getOrderData(orderId)
	}, [orderId])

	return (
		<div className="container my-5">
			<CheckoutProgress step={4} />
			<div className="row justify-content-center">
				<div className="col-lg-10">
					<h3 className="mb-4 fw-bold">訂購完成</h3>
					<p className="mb-1">感謝惠顧！</p>
					<p>
						您的商品會在付款日後 3-5
						個工作天送達，若有問題請洽安心小農Line客服。
					</p>
					<DeliveryInfo deliveryData={orderData.user} />
					<OrderInfo orderData={orderData} />
					<button
						type="button"
						className="btn btn-primary text-white mt-4"
						onClick={() => navigation('/')}
					>
						回到首頁
					</button>
				</div>
			</div>
		</div>
	)
}

export default CheckoutSuccess
