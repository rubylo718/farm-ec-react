import { faAnglesRight, faAnglesLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Pagination = ({ pagination, getDataList }) => {
	return (
		<nav aria-label="Page navigation">
			<ul className="pagination">
				<li className={`page-item ${pagination.has_pre ? '' : 'disabled'}`}>
					<span
						className="page-link "
						aria-label="Previous"
						onClick={(e) => {
							e.preventDefault()
							getDataList(pagination.current_page - 1)
						}}
					>
						<FontAwesomeIcon icon={faAnglesLeft} size="xs" />
					</span>
				</li>
				{[...new Array(pagination.total_pages)].map((_, i) => {
					return (
						<li className="page-item" key={i}>
							<span
								className={`page-link ${
									pagination.current_page === i + 1 ? 'active' : ''
								}`}
								onClick={(e) => {
									e.preventDefault()
									getDataList(i + 1)
								}}
							>
								{i + 1}
							</span>
						</li>
					)
				})}
				<li className={`page-item ${pagination.has_next ? '' : 'disabled'}`}>
					<span
						className="page-link"
						aria-label="Next"
						onClick={(e) => {
							e.preventDefault()
							getDataList(pagination.current_page + 1)
						}}
					>
						<FontAwesomeIcon icon={faAnglesRight} size="xs" />
					</span>
				</li>
			</ul>
		</nav>
	)
}

export default Pagination
