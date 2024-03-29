import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const AmountInput = ({ qty, handleAdd, handleMinus }) => {
	return (
		<div className="input-group my-3 flex-nowrap amount-input-max-width">
			<button
				type="button"
				className="btn btn-outline-secondary py-2"
				onClick={handleMinus}
			>
				<FontAwesomeIcon icon={faMinus} size="xs" />
			</button>
			<input
				type="text"
				className="form-control border-1 border-light text-center bg-light amount-input-min-width"
				aria-label="input amount"
				value={qty}
				readOnly
			/>
			<button
				type="button"
				className="btn btn-outline-secondary py-2"
				onClick={handleAdd}
			>
				<FontAwesomeIcon icon={faPlus} size="xs" />
			</button>
		</div>
	)
}

export default AmountInput
