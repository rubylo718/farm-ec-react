import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const AmountInput = () => {
	return (
		<div className="input-group my-3">
			<button className="btn btn-secondary">
				<FontAwesomeIcon icon={faMinus} />
			</button>
			<input
				type="text"
				className="form-control border-0 text-center bg-light"
				aria-label="input amount"
				value="1"
			/>
			<button className="btn btn-secondary">
				<FontAwesomeIcon icon={faPlus} />
			</button>
		</div>
	)
}

export default AmountInput
