import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getOrder } from '../../api/front'
import CheckoutProgress from '../../components/frontend/checkoutProcess/CheckoutProgress'
import OrderInfo from '../../components/frontend/checkoutProcess/OrderInfo'
import PaymentInfo from '../../components/frontend/checkoutProcess/PaymentInfo'
import DeliveryInfo from '../../components/frontend/checkoutProcess/DeliveryInfo'
import PaymentInfoButton from '../../components/frontend/checkoutProcess/PaymentInfoButton'

const Payment = () => {
	const { orderId } = useParams()
	const [orderData, setOrderData] = useState({})

	useEffect(() => {
		const getOrderData = async (orderId) => {
			const result = await getOrder(orderId)
			if (result.success) {
				setOrderData(result.order)
			}
		}
		getOrderData(orderId)
	}, [orderId])

	return (
		<div className="container my-5">
			<CheckoutProgress step={3} />
			<div className="row">
				<div className="col-lg-6 mb-2">
					<PaymentInfo orderData={orderData} />
				</div>
				<div className="col-lg-6 mb-4">
					<DeliveryInfo deliveryData={orderData.user} />
					<OrderInfo orderData={orderData} />
				</div>
				<div className="d-lg-none">
					<PaymentInfoButton isPaid={orderData.is_paid} />
				</div>
			</div>
		</div>
	)
}

export default Payment
