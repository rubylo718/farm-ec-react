const SocialMedia = () => {
	return (
		<div className="container">
			<div className="row justify-content-around px-3 bg-light py-5">
				<div className="col-4 text-center bg-primary py-2 el-hover">
					<h3>輕鬆加 Line 訂購水果</h3>
					<p className="text-muted">掃描行動條碼，即可將官方帳號加入好友！</p>
					<button className="btn btn-outline-light mt-4 rounded-0">
						點我立即加入好友
					</button>
				</div>
				<div className="col-4 text-center bg-info py-2 el-hover">
					<h3>作伙來加FB小農粉絲團</h3>
					<p className="text-muted">
						得知安心小農最新商品，以及不定期限時優惠！
					</p>
					<button className="btn btn-outline-light mt-4 rounded-0">
						點我進入粉絲專頁
					</button>
				</div>
			</div>
		</div>
	)
}

export default SocialMedia
