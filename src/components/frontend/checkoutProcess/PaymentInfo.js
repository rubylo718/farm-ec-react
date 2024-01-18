import { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { postPay } from '../../../api/front'
import { Toast } from '../../../utils/toast-helper'
import Spinner from '../../Spinner'
import Radio from '../../form/Radio'
import { faGooglePay, faApplePay } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
	const { register, handleSubmit } = useForm({ mode: 'onSubmit' })
	const { getCurrentCart } = useOutletContext()

	const onSubmit = async (data) => {
		setIsLoading(true)
		const orderId = orderData.id
		if (!orderId) {
			setIsLoading(false)
			return
		}
		const result = await postPay(orderId)
		if (result.success) {
			Toast.fire({
				icon: 'success',
				title: `使用 ${data.paymentMethod} 付款成功！`,
			})
			getCurrentCart()
			navigation(`/success/${orderId}`)
		} else {
			Toast.fire({ icon: 'error', title: '發生錯誤，付款失敗，請洽客服' })
		}
		setIsLoading(false)
	}

	return (
		<div className="mb-4">
			<Spinner isLoading={isLoading} />
			<h4 className="fw-semibold mb-3">付款方式</h4>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Radio
					register={register}
					name="paymentMethod"
					id="1"
					value="信用卡"
					labelText="信用卡"
					defaultChecked={true}
				/>
				<Radio
					register={register}
					name="paymentMethod"
					id="2"
					value="Line Pay"
					labelText="Line Pay"
					defaultChecked={false}
				/>
				<Radio
					register={register}
					name="paymentMethod"
					id="3"
					value="Google Pay"
					labelText={<FontAwesomeIcon icon={faGooglePay} size="2xl" />}
					defaultChecked={false}
				/>
				<Radio
					register={register}
					name="paymentMethod"
					id="4"
					value="Apple Pay"
					labelText={<FontAwesomeIcon icon={faApplePay} size="2xl" />}
					defaultChecked={false}
				/>
				<button type="submit" className="btn btn-primary text-white">
					確認結帳
				</button>
			</form>
		</div>
	)
}

const PaymentInfo = ({ orderData }) => {
	return (
		<>{orderData?.is_paid ? <Paid /> : <PayForm orderData={orderData} />}</>
	)
}

export default PaymentInfo
