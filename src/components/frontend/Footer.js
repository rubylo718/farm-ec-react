import { Link } from 'react-router-dom'
import {
	faFacebook,
	faInstagram,
	faLine,
	faYoutube,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import productData from '../../assets/selectOptions.json'

const Footer = () => {
	const GITHUB_URL = 'https://github.com/rubylo718/farm-ec-react'

	return (
		<footer className="bg-primary">
			<div className="container py-4">
				<div className="row text-white">
					<div className="col-4 py-2">
						<h3 className="fs-4">安心選購</h3>
						<ul className="nav nav-pills nav-stacked flex-column">
							{productData.productCategories.map((item, index) => {
								return (
									<li key={item.id}>
										<Link
											to={`/products/${index + 1}`}
											className="text-white text-decoration-none"
										>
											{item.title}
										</Link>
									</li>
								)
							})}
						</ul>
					</div>
					<div className="col-4 py-2">
						<h3 className="fs-4">部落格</h3>
						<ul className="nav nav-pills nav-stacked flex-column">
							<li>
								<Link to="/blog" className="text-white text-decoration-none">
									產地故事
								</Link>
							</li>
						</ul>
					</div>
					<div className="col-4 py-2">
						<h3 className="fs-4">社群連結</h3>
						<ul className="nav nav-pills">
							<li className="nav-item">
								<Link
									to={GITHUB_URL}
									target="_blank"
									className="nav-link ps-0 pe-2"
								>
									<FontAwesomeIcon
										icon={faFacebook}
										style={{ color: '#ffffff' }}
										size="xl"
									/>
								</Link>
							</li>
							<li className="nav-item">
								<Link
									to={GITHUB_URL}
									target="_blank"
									className="nav-link ps-0 pe-2"
								>
									<FontAwesomeIcon
										icon={faInstagram}
										style={{ color: '#ffffff' }}
										size="xl"
									/>
								</Link>
							</li>
							<li className="nav-item">
								<Link
									to={GITHUB_URL}
									target="_blank"
									className="nav-link ps-0 pe-2"
								>
									<FontAwesomeIcon
										icon={faLine}
										style={{ color: '#ffffff' }}
										size="xl"
									/>
								</Link>
							</li>
							<li className="nav-item">
								<Link
									to={GITHUB_URL}
									target="_blank"
									className="nav-link ps-0 pe-2"
								>
									<FontAwesomeIcon
										icon={faYoutube}
										style={{ color: '#ffffff' }}
										size="xl"
									/>
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className="mt-3">
					<p className="text-white d-md-inline mb-1 mb-md-4">
						© 2023 Ruby Lo All Rights Reserved.
					</p>
					<p className="text-white d-md-inline">
						本網站為技術練習作品，不具任何商業行為。
					</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer