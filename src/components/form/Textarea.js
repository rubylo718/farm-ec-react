const Textarea = ({ register, errors, id, rows, labelText, rules }) => {
	return (
		<>
			<label htmlFor={id} className="form-label">
				{rules?.required ? <span className="text-danger">*</span> : ''}
				{labelText}
			</label>
			<textarea
				id={id}
				type="text"
				className={`form-control ${errors[id] ? 'is-invalid' : ''}`}
				autoComplete="off"
				rows={rows}
				{...register(id, rules)}
			/>
			{errors[id] && (
				<small className="invalid-feedback">{errors[id].message}</small>
			)}
		</>
	)
}

export default Textarea
