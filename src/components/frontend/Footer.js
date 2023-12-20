import { Link } from 'react-router-dom'
import {
	faFacebook,
	faInstagram,
	faLine,
	faYoutube,
} from '@fortawesome/free-brands-svg-icons'
import { faSeedling } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import productData from '../../assets/selectOptions.json'

const Footer = () => {
	const GITHUB_URL = 'https://github.com/rubylo718/farm-ec-react'

	return (
		<footer className="bg-light footer-border">
			<div className="container py-4">
				<div className="row py-2">
					<div className="col-5 col-sm-4">
						<h3>
							<Link to="/" className="fs-4 text-decoration-none text-reset">
								<FontAwesomeIcon
									icon={faSeedling}
									className="me-1 text-primary"
								/>
								安心小農
							</Link>
						</h3>
						<ul className="nav nav-pills">
							<li className="nav-item">
								<Link
									to={GITHUB_URL}
									target="_blank"
									className="nav-link ps-0 text-secondary el-hover"
								>
									<FontAwesomeIcon icon={faFacebook} size="xl" />
								</Link>
							</li>
							<li className="nav-item">
								<Link
									to={GITHUB_URL}
									target="_blank"
									className="nav-link ps-0 text-secondary el-hover"
								>
									<FontAwesomeIcon icon={faInstagram} size="xl" />
								</Link>
							</li>
							<li className="nav-item">
								<Link
									to={GITHUB_URL}
									target="_blank"
									className="nav-link ps-0 text-secondary el-hover"
								>
									<FontAwesomeIcon icon={faLine} size="xl" />
								</Link>
							</li>
							<li className="nav-item">
								<Link
									to={GITHUB_URL}
									target="_blank"
									className="nav-link ps-0 text-secondary el-hover"
								>
									<FontAwesomeIcon icon={faYoutube} size="xl" />
								</Link>
							</li>
						</ul>
					</div>
					<div className="col-4">
						<h3 className="fs-4">安心選購</h3>
						<ul className="nav nav-pills nav-stacked flex-column">
							{productData.productCategories.map((item, index) => {
								return (
									<li key={item.id} className='nav-item input-h40'>
										<Link
											to={`/products/${index + 1}`}
											className="text-secondary text-decoration-none"
										>
											{item.title}
										</Link>
									</li>
								)
							})}
						</ul>
					</div>
					<div className="col-3 col-sm-4">
						<h3 className="fs-4">部落格</h3>
						<ul className="nav nav-pills nav-stacked flex-column">
							<li>
								<Link
									to="/blog"
									className="text-secondary text-decoration-none"
								>
									產地故事
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className="mt-3">
					<p className="text-secondary d-md-inline mb-1 mb-md-4">
						© 2023 Ruby Lo. All Rights Reserved.
					</p>
					<p className="text-secondary d-md-inline">
						本網站為技術練習作品，不具任何商業行為。
					</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer
