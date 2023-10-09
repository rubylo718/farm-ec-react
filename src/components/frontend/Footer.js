import { Link } from 'react-router-dom'
import {
	faFacebook,
	faInstagram,
	faLine,
	faYoutube,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import productData from '../../utils/selectOptions.json'

const Footer = () => {
	return (
		<div className="bg-primary">
			<div className="container py-4">
				<div className="row text-white">
					<div className="col-sm-4 col-6 py-2">
						<h3 className="fs-4">安心選購</h3>
						<ul className="nav nav-pills nav-stacked flex-column">
							{productData.productCategories.map((item) => {
								return (
									<li key={item.id}>
										<Link to="/" className="text-white text-decoration-none">
											{item.title}
										</Link>
									</li>
								)
							})}
						</ul>
					</div>
					<div className="col-sm-4 col-6 py-2">
						<h3 className="fs-4">關於我們</h3>
						<ul className="nav nav-pills nav-stacked flex-column">
							<li>
								<Link to="/" className="text-white text-decoration-none">
									關於文章
								</Link>
							</li>
						</ul>
					</div>
					<div className="col-sm-4 col-6 py-2">
						<h3 className="fs-4">社群連結</h3>
						<ul className="nav nav-pills">
							<li className="nav-item">
								<Link to="/" className="nav-link">
									<FontAwesomeIcon
										icon={faFacebook}
										style={{ color: '#ffffff' }}
										size="xl"
									/>
								</Link>
							</li>
							<li className="nav-item">
								<Link to="/" className="nav-link">
									<FontAwesomeIcon
										icon={faInstagram}
										style={{ color: '#ffffff' }}
										size="xl"
									/>
								</Link>
							</li>
							<li className="nav-item">
								<Link to="/" className="nav-link">
									<FontAwesomeIcon
										icon={faLine}
										style={{ color: '#ffffff' }}
										size="xl"
									/>
								</Link>
							</li>
							<li className="nav-item">
								<Link to="/" className="nav-link">
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
				<div className="row mt-3">
					<p className="text-white">© 2023 Ruby Lo All Rights Reserved.</p>
				</div>
			</div>
		</div>
	)
}

export default Footer
