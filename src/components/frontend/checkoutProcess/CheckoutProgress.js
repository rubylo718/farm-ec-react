import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CheckoutProgress = ({ step }) => {
	return (
		<div
			className="container w-50 my-4"
			style={{ height: '50px', minWidth: '200px' }}
		>
			<div className="position-relative mx-0">
				<div
					className="progress"
					role="progressbar"
					aria-label="Progress"
					aria-valuenow={step === 1 ? '50' : '100'}
					aria-valuemin="0"
					aria-valuemax="100"
					style={{ height: '2px' }}
				>
					<div
						className="progress-bar bg-primary"
						style={{ width: `${step === 1 ? '50' : '100'}%` }}
					></div>
				</div>
				<button
					type="button"
					className="position-absolute top-0 start-0 translate-middle btn btn-sm btn-primary text-white rounded-pill"
					style={{ width: '2rem', height: '2rem' }}
				>
					1
				</button>
				<button
					type="button"
					className={`position-absolute top-0 start-50 translate-middle btn btn-sm ${
						step !== 1 ? 'btn-primary text-white' : 'btn-light text-secondary'
					} rounded-pill`}
					style={{ width: '2rem', height: '2rem' }}
				>
					2
				</button>
				<button
					type="button"
					className={`position-absolute top-0 start-100 translate-middle btn btn-sm ${
						step === 3 ? 'btn-primary text-white' : 'btn-light text-secondary'
					} rounded-pill`}
					style={{ width: '2rem', height: '2rem' }}
				>
					<FontAwesomeIcon icon={faCheck} className='text-reset'/>
				</button>
				<span className="position-absolute start-0 translate-middle-x mt-3">
					購物車
				</span>
				<span className="position-absolute start-50 translate-middle-x mt-3">
					收件資訊
				</span>
				<span className="position-absolute start-100 translate-middle-x mt-3 text-nowrap">
					完成結帳
				</span>
			</div>
		</div>
	)
}

export default CheckoutProgress
