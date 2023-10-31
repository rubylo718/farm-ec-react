import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Banner = () => {
	const [searchInput, setSearchInput] = useState('')
	const navigate = useNavigate()

	const handleChange = (e) => {
		setSearchInput(e.target.value)
	}
	const handleSearch = (e) => {
		if (!searchInput.length) return
		if (
			e.key === 'Enter' ||
			e.target.id === 'search' ||
			e.target.id === 'searchIcon'
		) {
			navigate(`/products/keyword?query=${searchInput}`)
		}
	}

	return (
		<div className="container">
			<div className="row flex-md-row-reverse flex-column mt-5">
				<div className="col-md-6">
					<img
						src="https://images.unsplash.com/photo-1498579397066-22750a3cb424?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"
						alt="..."
						className="img-fluid"
					/>
				</div>
				<div className="col-md-6 d-flex flex-column justify-content-center mt-md-0 mt-3">
					<h2 className="fw-bold">產銷履歷 安心安全</h2>
					<h5 className="font-weight-normal text-muted mt-2">
						陪您幸福料理好味道
					</h5>
					<div className="input-group mb-0 mt-4 w-75">
						<input
							type="text"
							className="form-control"
							placeholder="搜尋商品名稱"
							value={searchInput}
							onChange={handleChange}
							onKeyDown={handleSearch}
						/>

						<button
							className="btn btn-primary text-white"
							type="button"
							id="search"
							onClick={handleSearch}
						>
							<FontAwesomeIcon
								icon={faMagnifyingGlass}
								className="text-white"
								id="searchIcon"
								onClick={handleSearch}
							/>
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Banner
