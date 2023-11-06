import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const AmountInput = ({ qty, handleAdd, handleMinus }) => {
	return (
		<div className="input-group my-3 flex-nowrap">
			<button className="btn btn-secondary" onClick={handleMinus}>
				<FontAwesomeIcon icon={faMinus} />
			</button>
			<input
				type="text"
				className="form-control border-0 text-center bg-light"
				style={{ minWidth: '36px' }}
				aria-label="input amount"
				value={qty}
				readOnly
			/>
			<button className="btn btn-secondary" onClick={handleAdd}>
				<FontAwesomeIcon icon={faPlus} />
			</button>
		</div>
	)
}

export default AmountInput
