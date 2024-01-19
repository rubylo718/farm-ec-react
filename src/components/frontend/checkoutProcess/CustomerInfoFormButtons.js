import { useNavigate } from 'react-router-dom'

const CustomerInfoFormButtons = () => {
	const navigation = useNavigate()
	return (
		<div className="d-flex justify-content-end">
			<button
				type="button"
				className="btn btn-light"
				onClick={() => navigation(-1)}
				form="customerInfoForm"
			>
				回上一頁
			</button>
			<button
				type="submit"
				className="btn btn-primary ms-4 text-white"
				form="customerInfoForm"
			>
				下一步
			</button>
		</div>
	)
}

export default CustomerInfoFormButtons
