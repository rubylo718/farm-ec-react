const Selection = ({ register, errors, id, labelText, children, rules }) => {
	return (
		<>
			<label htmlFor={id} className="form-label">
				{rules?.required ? <span className="text-danger">*</span> : ''}
				{labelText}
			</label>
			<select
				id={id}
				className={`form-select input-h40 ${errors[id] ? 'is-invalid' : ''} `}
				{...register(id, rules)}
			>
				{children}
			</select>
			{errors[id] && (
				<small className="invalid-feedback">{errors[id].message}</small>
			)}
		</>
	)
}

export default Selection
