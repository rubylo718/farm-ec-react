const Checkbox = ({ register, errors, id, labelText, rules }) => {
	return (
		<div className="form-check">
			<input
				className={`form-check-input ${errors[id] && 'is-invalid'}`}
				type="checkbox"
				id={id}
				{...register(id, rules)}
			/>
			<label className="form-check-label" htmlFor={id}>
				{labelText}
			</label>
			{errors[id] && (
				<small className="invalid-feedback">{errors[id].message}</small>
			)}
		</div>
	)
}

export default Checkbox
