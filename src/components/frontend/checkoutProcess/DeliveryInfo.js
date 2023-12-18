const DeliveryInfo = ({ deliveryData }) => {
	return (
		<div className="border rounded-2 p-4 mb-4">
			<h4 className="fw-bold mb-4">收件資訊</h4>
			<p className="mb-1">收件人姓名：{deliveryData?.name}</p>
			<p className="mb-1">電子信箱：{deliveryData?.email}</p>
			<p className="mb-1">收件人聯絡電話：{deliveryData?.tel}</p>
			<p className="mb-1">收件地址：{deliveryData?.address}</p>
		</div>
	)
}

export default DeliveryInfo
