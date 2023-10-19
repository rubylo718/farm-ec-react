const CustomerInfoForm = () => {
	return (
		<form className="row">
			<h4 className="fw-semibold">收件資訊</h4>
			<div className="mb-2">
				<label htmlFor="name" className="form-label">
					收件人姓名
				</label>
				<input type="text" className="form-control" id="name" />
			</div>
			<div className="mb-2">
				<label for="email" className="form-label">
					電子信箱
				</label>
				<input type="email" className="form-control" id="email" />
			</div>
			<div className="mb-2">
				<label for="tel" className="form-label">
					收件人聯絡電話
				</label>
				<input
					type="phone"
					className="form-control"
					id="tel"
					placeholder="格式：0912123456"
				/>
			</div>
			<p className="mb-2">收件地址</p>
			<div className="col-6">
				<select id="city" className="form-select">
					<option selected>縣/市</option>
					<option>...</option>
				</select>
			</div>
			<div className="col-6">
				<select id="area" className="form-select">
					<option selected>鄉鎮/區</option>
					<option>...</option>
				</select>
			</div>
			<div className="mb-2">
				<input
					type="text"
					className="form-control mt-1"
					id="short-address"
					placeholder="地址"
				/>
			</div>

			<div className="mb-2">
				<label htmlFor="message" className="form-label">
					訂單備註
				</label>
				<textarea
					className="form-control"
					name="message"
					placeholder="有什麼想告訴我們嗎？"
				/>
			</div>
		</form>
	)
}

export default CustomerInfoForm
