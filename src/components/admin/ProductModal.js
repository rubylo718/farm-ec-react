import { useState } from 'react'
import productData from '../../utils/selectOptions.json'
import { postProduct } from '../../api/admin'
import { Toast } from '../../utils/toast-helper'

const ProductModal = ({ handleHideProductModal, getProductList }) => {
	const [inputData, setInputData] = useState({
		title: '',
		category: '',
		origin_price: 0,
		price: 0,
		unit: '',
		description: '',
		content: '',
		is_enabled: 0,
		imageUrl: '',
	})

	const handleChange = (e) => {
		const { name, value } = e.target
		if (['price', 'origin_price'].includes(name)) {
			setInputData({ ...inputData, [name]: Number(value) })
		} else if (name === 'is_enabled') {
			setInputData({ ...inputData, [name]: +e.target.checked })
		} else {
			setInputData({ ...inputData, [name]: value })
		}
	}

	const handleSubmit = async () => {
		const result = await postProduct(inputData)
		if (result.success) {
			Toast.fire({ icon: 'success', title: `${result.message}` })
		} else {
			Toast.fire({ icon: 'error', title: `${result.message}` })
		}
		getProductList()
		handleHideProductModal()
	}

	return (
		<div
			className="modal fade"
			tabIndex="-1"
			aria-labelledby="productModal"
			aria-hidden="true"
			id="productModal"
		>
			<div className="modal-dialog modal-lg">
				<div className="modal-content">
					<div className="modal-header">
						<h1 className="modal-title fs-5">建立新商品</h1>
						<button
							type="button"
							className="btn-close"
							aria-label="Close"
							onClick={handleHideProductModal}
						/>
					</div>
					<div className="modal-body">
						<div className="row">
							<div className="col-sm-4">
								<div className="form-group mb-2">
									<label className="w-100" htmlFor="image">
										輸入圖片網址
									</label>
									<input
										type="text"
										name="imageUrl"
										id="image"
										placeholder="請輸入圖片網址"
										className="form-control"
										value={inputData.imageUrl}
										onChange={handleChange}
									/>
								</div>
								<div className="form-group mb-2">
									<label className="w-100" htmlFor="customFile">
										或 上傳圖片
										<input
											type="file"
											id="customFile"
											className="form-control"
										/>
									</label>
								</div>
								<img src="" alt="" className="img-fluid" />
							</div>
							<div className="col-sm-8">
								<div className="form-group mb-2">
									<label className="w-100" htmlFor="title">
										標題
									</label>
									<input
										type="text"
										id="title"
										name="title"
										placeholder="請輸入標題"
										className="form-control"
										onChange={handleChange}
										value={inputData.title}
									/>
								</div>
								<div className="row">
									<div className="form-group mb-2 col-md-6">
										<label className="w-100" htmlFor="category">
											分類
										</label>
										<select
											className="form-select"
											id="category"
											name="category"
											aria-label="product category select"
											value={inputData.category}
											onChange={handleChange}
										>
											<option value="" disabled>
												請選擇分類
											</option>
											{productData.productCategories.map((item) => {
												return (
													<option key={item.id} value={item.title}>
														{item.title}
													</option>
												)
											})}
										</select>
									</div>
									<div className="form-group mb-2 col-md-6">
										<label className="w-100" htmlFor="unit">
											單位
										</label>
										<select
											className="form-select"
											id="unit"
											name="unit"
											aria-label="product unit select"
											value={inputData.unit}
											onChange={handleChange}
										>
											<option value="" disabled>
												請選擇單位
											</option>
											{productData.productUnit.map((item) => {
												return (
													<option key={item.id} value={item.title}>
														{item.title}
													</option>
												)
											})}
										</select>
									</div>
								</div>
								<div className="row">
									<div className="form-group mb-2 col-md-6">
										<label className="w-100" htmlFor="origin_price">
											原價
										</label>
										<input
											type="number"
											id="origin_price"
											name="origin_price"
											placeholder="請輸入原價"
											className="form-control"
											min="0"
											value={inputData.origin_price}
											onChange={handleChange}
										/>
									</div>
									<div className="form-group mb-2 col-md-6">
										<label className="w-100" htmlFor="price">
											售價
										</label>
										<input
											type="number"
											id="price"
											name="price"
											placeholder="請輸入售價"
											className="form-control"
											min="0"
											value={inputData.price}
											onChange={handleChange}
										/>
									</div>
								</div>
								<hr />
								<div className="form-group mb-2">
									<label className="w-100" htmlFor="description">
										產品描述
									</label>
									<textarea
										type="text"
										id="description"
										name="description"
										placeholder="請輸入產品描述"
										className="form-control"
										value={inputData.description}
										onChange={handleChange}
									/>
								</div>
								<div className="form-group mb-2">
									<label className="w-100" htmlFor="content">
										說明內容
									</label>
									<textarea
										type="text"
										id="content"
										name="content"
										placeholder="請輸入產品說明內容"
										className="form-control"
										value={inputData.content}
										onChange={handleChange}
									/>
								</div>
								<div className="form-group mb-2">
									<div className="form-check">
										<label
											className="w-100 form-check-label"
											htmlFor="is_enabled"
										>
											是否啟用
										</label>
										<input
											type="checkbox"
											id="is_enabled"
											name="is_enabled"
											placeholder="請輸入產品說明內容"
											className="form-check-input"
											value={inputData.is_enabled}
											onChange={handleChange}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-secondary"
							onClick={handleHideProductModal}
						>
							關閉
						</button>
						<button
							type="button"
							className="btn btn-primary"
							onClick={handleSubmit}
						>
							儲存
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProductModal
