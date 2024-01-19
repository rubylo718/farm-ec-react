import CustomerInfoForm from '../../components/frontend/checkoutProcess/CustomerInfoForm'
import CustomerInfoFormButtons from '../../components/frontend/checkoutProcess/CustomerInfoFormButtons'
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
				<div className="col-lg-5 mb-4">
					<CartInfo />
				</div>
				<div className="d-lg-none">
					<CustomerInfoFormButtons />
				</div>
			</div>
		</div>
	)
}

export default Checkout
