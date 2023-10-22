const Spinner = ({ isLoading }) => {
	return (
		<div
			className="loading"
			style={{
				display: isLoading ? 'flex' : 'none',
				position: 'fixed',
				top: 0,
				bottom: 0,
				left: 0,
				right: 0,
				backgroundColor: 'rgba(255, 255, 255, 0.15)',
				backdropFilter: 'blur(3px)',
				zIndex: 999,
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div className="spinner-border text-primary" role="status">
				<span className="visually-hidden">Loading...</span>
			</div>
		</div>
	)
}

export default Spinner
