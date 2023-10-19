import CustomerInfoForm from '../../components/frontend/checkoutProcess/CustomerInfoForm'
import OrderInfo from '../../components/frontend/checkoutProcess/OrderInfo'

const Checkout = () => {
	return (
		<div className="container my-5">
			<h3 className="mb-4">訂單結帳</h3>
			<div className="row">
				<div className="col-md-8">
					<CustomerInfoForm />
				</div>
				<div className="col-md-4">
					<OrderInfo />
				</div>
			</div>
		</div>
	)
}

export default Checkout
