const Spinner = ({ isLoading }) => {
	return (
		<div className={`loading spinner-bg d-${isLoading ? `flex` : `none`}`}>
			<div className="spinner-border text-primary" role="status">
				<span className="visually-hidden">Loading...</span>
			</div>
		</div>
	)
}

export default Spinner
