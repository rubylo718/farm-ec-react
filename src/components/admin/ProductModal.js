import { useForm, useWatch } from 'react-hook-form'
import productData from '../../assets/selectOptions.json'
import { postProduct, editProduct } from '../../api/admin'
import { Toast } from '../../utils/toast-helper'
import Input from '../form/Input'
import Selection from '../form/Selection'
import Textarea from '../form/Textarea'
import Checkbox from '../form/Checkbox'
import Spinner from '../Spinner'

const ProductModal = ({
	handleHideProductModal,
	getProductList,
	modalData,
}) => {
	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { isDirty, errors, isSubmitting },
	} = useForm({
		mode: 'onSubmit',
		values: { ...modalData, is_enabled: Boolean(modalData.is_enabled) },
	})

	const watchImgUrl = useWatch({ control, name: 'imageUrl', defaultValue: '' })

	const onSubmit = async (data) => {
		if (!isDirty) {
			handleHideProductModal()
			return
		}
		const newData = { ...data, is_enabled: +data.is_enabled }
		try {
			if (newData.action === 'create') {
				await postProduct(newData)
			} else if (newData.action === 'edit') {
				await editProduct(newData, newData.id)
			}
			Toast.fire({ icon: 'success', title: '操作成功' })
			getProductList()
			handleHideProductModal()
		} catch (error) {
			Toast.fire({ icon: 'error', title: '發生錯誤，請重新操作' })
		}
	}

	const handleCancel = () => {
		reset()
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
			<Spinner isLoading={isSubmitting} />
			<div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
				<div className="modal-content">
					<div className="modal-header">
						<h1 className="modal-title fs-5">
							{modalData.action === 'create' ? '建立新商品' : '編輯商品'}
						</h1>
						<button
							type="button"
							className="btn-close"
							aria-label="Close"
							onClick={handleCancel}
						/>
					</div>
					<div className="modal-body">
						<form onSubmit={handleSubmit(onSubmit)} id="productModalForm">
							<div className="row">
								<div className="col-sm-4">
									<div className="form-group mb-2">
										<Textarea
											register={register}
											errors={errors}
											id="imageUrl"
											rows="2"
											labelText="圖片網址"
										/>
									</div>
									{watchImgUrl && (
										<>
											<p className="mb-1">圖片預覽</p>
											<img
												src={watchImgUrl}
												alt="圖片預覽處"
												className="img-fluid"
											/>
										</>
									)}
								</div>
								<div className="col-sm-8">
									<div className="form-group mb-2">
										<Input
											register={register}
											errors={errors}
											id="title"
											type="text"
											labelText="標題"
											rules={{ required: '請輸入標題' }}
										/>
									</div>
									<div className="row">
										<div className="form-group mb-2 col-md-6">
											<Selection
												register={register}
												errors={errors}
												id="category"
												labelText="分類"
												rules={{ required: '請選擇分類' }}
											>
												<option value="">請選擇分類</option>
												{productData.productCategories.map((item) => {
													return (
														<option key={item.id} value={item.title}>
															{item.title}
														</option>
													)
												})}
											</Selection>
										</div>
										<div className="form-group mb-2 col-md-6">
											<Selection
												register={register}
												errors={errors}
												id="unit"
												labelText="單位"
												rules={{ required: '請選擇單位' }}
											>
												<option value="">請選擇分類</option>
												{productData.productUnit.map((item) => {
													return (
														<option key={item.id} value={item.title}>
															{item.title}
														</option>
													)
												})}
											</Selection>
										</div>
									</div>
									<div className="row">
										<div className="form-group mb-2 col-md-6">
											<Input
												register={register}
												errors={errors}
												id="origin_price"
												type="number"
												labelText="原價"
												rules={{
													required: '請輸入原價',
													valueAsNumber: true,
													min: { value: 1, message: '原價不得為零' },
												}}
											/>
										</div>
										<div className="form-group mb-2 col-md-6">
											<Input
												register={register}
												errors={errors}
												id="price"
												type="number"
												labelText="售價"
												rules={{
													required: '請輸入售價',
													valueAsNumber: true,
													min: { value: 1, message: '售價不得為零' },
												}}
											/>
										</div>
									</div>
									<hr />
									<div className="form-group mb-2">
										<Textarea
											register={register}
											errors={errors}
											id="description"
											rows="2"
											labelText="商品簡介"
										/>
									</div>
									<div className="form-group mb-2">
										<Textarea
											register={register}
											errors={errors}
											id="content"
											rows="8"
											labelText="商品說明（按Enter分段）"
										/>
									</div>
									<div className="form-group mb-2">
										<Checkbox
											register={register}
											errors={errors}
											id="is_enabled"
											labelText="上架"
										/>
									</div>
								</div>
							</div>
						</form>
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-outline-secondary"
							onClick={handleCancel}
							form="productModalForm"
						>
							取消
						</button>
						<button
							type="submit"
							className="btn btn-primary text-white"
							form="productModalForm"
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
