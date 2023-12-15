import { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { postPay } from '../../../api/front'
import { Toast } from '../../../utils/toast-helper'
import Spinner from '../../Spinner'

const Paid = () => {
	const navigation = useNavigate()
	return (
		<>
			<p className="mb-1">此筆訂單已付款完成了，感謝惠顧！</p>
			<p>
				您的商品會在付款日後 3-5 個工作天送達，若有問題請洽安心小農Line客服。
			</p>
			<button
				type="button"
				className="btn btn-primary text-white"
				onClick={() => navigation('/')}
			>
				回到首頁
			</button>
		</>
	)
}

const PayForm = ({ orderData }) => {
	const [isLoading, setIsLoading] = useState(false)
	const navigation = useNavigate()
	const { handleSubmit } = useForm({ mode: 'onSubmit' })
	const { getCurrentCart } = useOutletContext()

	const onSubmit = async () => {
		setIsLoading(true)
		const orderId = orderData.id
		if (!orderId) {
			setIsLoading(false)
			return
		}
		const result = await postPay(orderId)
		if (result.success) {
			Toast.fire({ icon: 'success', title: '付款成功！' })
			getCurrentCart()
			navigation(`/success/${orderId}`)
		} else {
			Toast.fire({ icon: 'error', title: '發生錯誤，付款失敗，請洽客服' })
		}
		setIsLoading(false)
	}

	return (
		<>
			<Spinner isLoading={isLoading} />
			<h4 className="fw-semibold">填寫付款資訊</h4>
			<form className="row" onSubmit={handleSubmit(onSubmit)}>
				<div className="d-flex justify-content-end">
					<button
						type="submit"
						className="btn btn-primary mt-4 ms-4 text-white"
					>
						確認結帳
					</button>
				</div>
			</form>
		</>
	)
}

const PaymentInfo = ({ orderData }) => {
	return (
		<>{orderData?.is_paid ? <Paid /> : <PayForm orderData={orderData} />}</>
	)
}

export default PaymentInfo
