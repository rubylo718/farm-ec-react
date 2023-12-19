import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CheckoutProgress = ({ step }) => {
	const valueNow = (step - 1) * 50

	return (
		<div className="container w-50 my-4 bar-container">
			<div className="position-relative mx-0">
				<div
					className="progress bar-line"
					role="progressbar"
					aria-label="Progress"
					aria-valuenow={valueNow}
					aria-valuemin="0"
					aria-valuemax="100"
				>
					<div className={`progress-bar bg-primary w-${valueNow}`}></div>
				</div>
				<button
					type="button"
					className={`position-absolute top-0 start-0 translate-middle btn btn-sm bar-btn rounded-pill
					${step >= 1 ? 'btn-primary text-white' : 'btn-light text-secondary'} `}
				>
					{step > 1 ? (
						<FontAwesomeIcon icon={faCheck} className="text-reset" />
					) : (
						'1'
					)}
				</button>
				<button
					type="button"
					className={`position-absolute top-0 start-50 translate-middle btn btn-sm bar-btn rounded-pill 
					${step >= 2 ? 'btn-primary text-white' : 'btn-light text-secondary'}`}
				>
					{step > 2 ? (
						<FontAwesomeIcon icon={faCheck} className="text-reset" />
					) : (
						'2'
					)}
				</button>
				<button
					type="button"
					className={`position-absolute top-0 start-100 translate-middle btn btn-sm bar-btn rounded-pill 
					${step >= 3 ? 'btn-primary text-white' : 'btn-light text-secondary'}`}
				>
					{step > 3 ? (
						<FontAwesomeIcon icon={faCheck} className="text-reset" />
					) : (
						'3'
					)}
				</button>
				<span className="position-absolute start-0 translate-middle-x mt-3">
					購物車
				</span>
				<span className="position-absolute start-50 translate-middle-x mt-3">
					填寫收件資訊
				</span>
				<span className="position-absolute start-100 translate-middle-x mt-3 text-nowrap">
					選擇付款方式
				</span>
			</div>
		</div>
	)
}

export default CheckoutProgress
