const Radio = ({ register, name, id, labelText, value, defaultChecked }) => {
	return (
		<div className="form-check">
			<input
				className="form-check-input"
				type="radio"
				name={name}
				id={id}
				value={value}
				defaultChecked={defaultChecked}
				{...register(name)}
			/>
			<label className="form-check-label input-h40" htmlFor={id}>
				{labelText}
			</label>
		</div>
	)
}

export default Radio
