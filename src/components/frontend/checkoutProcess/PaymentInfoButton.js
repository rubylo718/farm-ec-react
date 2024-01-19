import { useNavigate } from 'react-router-dom'

const PaymentInfoButton = ({ isPaid }) => {
	const navigation = useNavigate()
	return (
		<>
			{isPaid ? (
				<button
					type="button"
					className="btn btn-primary text-white"
					onClick={() => navigation('/')}
				>
					回到首頁
				</button>
			) : (
				<button
					type="submit"
					className="btn btn-primary text-white"
					form="paymentInfoForm"
				>
					確認結帳
				</button>
			)}
		</>
	)
}

export default PaymentInfoButton
