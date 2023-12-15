import CustomerInfoForm from '../../components/frontend/checkoutProcess/CustomerInfoForm'
import CartInfo from '../../components/frontend/checkoutProcess/CartInfo'
import CheckoutProgress from '../../components/frontend/checkoutProcess/CheckoutProgress'

const Checkout = () => {
	return (
		<div className="container my-5">
			<CheckoutProgress step={2} />
			<div className="row">
				<div className="col-lg-7 mb-4">
					<CustomerInfoForm />
				</div>
				<div className="col-lg-5">
					<CartInfo />
				</div>
			</div>
		</div>
	)
}

export default Checkout
