import { Link } from 'react-router-dom'

const SocialMedia = () => {
	const GITHUB_URL = 'https://github.com/rubylo718/farm-ec-react'
	return (
		<div className="container">
			<div className="row justify-content-around px-3 bg-light py-5">
				<div className="col-5 text-center bg-primary py-2 el-hover">
					<h3>輕鬆加 Line 訂購水果</h3>
					<p className="text-muted">掃描行動條碼，即可將官方帳號加入好友！</p>
					<Link
						role="button"
						className="btn btn-outline-light mt-4 rounded-0"
						to={GITHUB_URL}
						target="_blank" 
					>
						點我立即加入好友
					</Link>
				</div>
				<div className="col-5 text-center bg-info py-2 el-hover">
					<h3>作伙來FB小農粉絲團</h3>
					<p className="text-muted">得知小農最新商品，以及不定期限時優惠！</p>
					<Link
						role="button"
						className="btn btn-outline-light mt-4 rounded-0"
						to={GITHUB_URL}
						target="_blank" 
					>
						點我進入粉絲專頁
					</Link>
				</div>
			</div>
		</div>
	)
}

export default SocialMedia
