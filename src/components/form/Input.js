const Input = ({ register, errors, id, type, labelText, rules, readOnly }) => {
	return (
		<>
			<label htmlFor={id} className="form-label">
				{rules?.required ? <span className="text-danger">*</span> : ''}
				{labelText}
			</label>
			<input
				id={id}
				type={type}
				className={`form-control input-h40 ${errors[id] ? 'is-invalid' : ''}`}
				autoComplete="on"
				readOnly={readOnly || false}
				{...register(id, rules)}
			/>
			{errors[id] && (
				<small className="invalid-feedback">{errors[id].message}</small>
			)}
		</>
	)
}

export default Input
