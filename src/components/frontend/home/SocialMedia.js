import { Link } from 'react-router-dom'

const SocialMedia = () => {
	const GITHUB_URL = 'https://github.com/rubylo718/farm-ec-react'
	return (
		<div className="container mt-5">
			<div className="row py-4">
				<div className="col-sm-6 my-2 mb-sm-0 d-flex justify-content-center">
					<div className="card text-center">
						<div className="card-body">
							<h3 className="card-title fs-4">輕鬆加 Line 訂購水果</h3>
							<p className="card-text text-muted">
								掃描行動條碼，即可將官方帳號加入好友！
							</p>
							<Link
								role="button"
								className="btn btn-primary text-white"
								to={GITHUB_URL}
								target="_blank"
							>
								點我立即加入好友
							</Link>
						</div>
					</div>
				</div>
				<div className="col-sm-6 my-2 mb-sm-0 d-flex justify-content-center">
					<div className="card text-center">
						<div className="card-body">
							<h3 className="card-title fs-4">作伙來 FB 小農粉絲團</h3>
							<p className="card-text text-muted">
								得知小農最新商品，以及不定期限時優惠！
							</p>
							<Link
								role="button"
								className="btn btn-info text-white"
								to={GITHUB_URL}
								target="_blank"
							>
								點我進入粉絲專頁
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SocialMedia
