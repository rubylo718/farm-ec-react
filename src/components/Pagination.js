const Pagination = ({ pagination, getDataList }) => {
	return (
		<nav aria-label="Page navigation">
			<ul className="pagination">
				<li className={`page-item ${pagination.has_pre ? '' : 'disabled'}`}>
					<a
						className="page-link"
						href="/"
						aria-label="Previous"
						onClick={(e) => {
							e.preventDefault()
							getDataList(pagination.current_page - 1)
						}}
					>
						<span aria-hidden="true">&laquo;</span>
					</a>
				</li>
				{[...new Array(pagination.total_pages)].map((_, i) => {
					return (
						<li className="page-item" key={i}>
							<a
								className={`page-link ${
									pagination.current_page === i + 1 ? 'active' : ''
								}`}
								href="/"
								onClick={(e) => {
									e.preventDefault()
									getDataList(i + 1)
								}}
							>
								{i + 1}
							</a>
						</li>
					)
				})}
				<li className={`page-item ${pagination.has_next ? '' : 'disabled'}`}>
					<a
						className="page-link"
						href="/"
						aria-label="Next"
						onClick={(e) => {
							e.preventDefault()
							getDataList(pagination.current_page + 1)
						}}
					>
						<span aria-hidden="true">&raquo;</span>
					</a>
				</li>
			</ul>
		</nav>
	)
}

export default Pagination
