import { useState, useEffect } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { useForm, useWatch } from 'react-hook-form'
import taiwanData from '../../../assets/taiwan.json'
import { postOrder } from '../../../api/front'
import { Toast, InputConfirmation } from '../../../utils/toast-helper'
import Spinner from '../../Spinner'

const Input = ({ register, errors, id, type, labelText, rules }) => {
	return (
		<div className="mb-2">
			<label htmlFor={id} className="form-label">
				<span className="text-danger">*</span>
				{labelText}
			</label>
			<input
				id={id}
				type={type}
				className={`form-control input-h40 ${errors[id] ? 'is-invalid' : ''}`}
				autoComplete="on"
				{...register(id, rules)}
			/>
			{errors[id] && (
				<small className="invalid-feedback">{errors[id].message}</small>
			)}
		</div>
	)
}

const Selection = ({ register, errors, id, labelText, children, rules }) => {
	return (
		<div className="col-4 mb-2">
			<label htmlFor={id} className="form-label">
				<span className="text-danger">*</span>
				{labelText}
			</label>
			<select
				id={id}
				className={`form-select input-h40 ${errors[id] ? 'is-invalid' : ''} `}
				{...register(id, rules)}
			>
				{children}
			</select>
			{errors[id] && (
				<small className="invalid-feedback">{errors[id].message}</small>
			)}
		</div>
	)
}

const CustomerInfoForm = () => {
	const navigation = useNavigate()
	const {
		register,
		handleSubmit,
		getValues,
		control,
		formState: { errors },
	} = useForm({ mode: 'onSubmit' })

	const [addressData, setAddressData] = useState([])
	const watchCity = useWatch({ control, name: 'city' })
	const watchDistrict = useWatch({ control, name: 'district' })
	const [isLoading, setIsLoading] = useState(false)
	const { getCurrentCart } = useOutletContext()

	const onSubmit = async (data) => {
		const user = {
			name: data.name,
			email: data.email,
			tel: data.tel,
			address: data.city + data.district + data.road + data.add,
		}
		const { isConfirmed } = await InputConfirmation.fire({
			title: '請確認以下收件資訊正確',
			html: `
					<p class="mb-1">收件人姓名：${user.name}</p>
					<p class="mb-1">電子信箱：${user.email}</p>
					<p class="mb-1">收件人聯絡電話：${user.tel}</p>
					<p class="mb-1">收件地址：${user.address}</p>
			`,
		})
		if (isConfirmed) {
			setIsLoading(true)
			const result = await postOrder(user, data.message)
			if (result?.success) {
				const orderId = result.orderId
				Toast.fire({ icon: 'success', title: '訂單成立' })
				getCurrentCart()
				navigation(`/payment/${orderId}`)
			} else {
				Toast.fire({
					icon: 'error',
					title: '發生錯誤，訂單成立失敗，請重新整理再試一次',
				})
			}
			setIsLoading(false)
		} else {
			return
		}
	}

	useEffect(() => {
		setAddressData(taiwanData)
	}, [])

	useEffect(() => {}, [watchCity, watchDistrict])

	return (
		<>
			<Spinner isLoading={isLoading} />
			<form className="row" onSubmit={handleSubmit(onSubmit)}>
				<h4 className="fw-semibold">填寫收件資訊</h4>
				<Input
					register={register}
					errors={errors}
					id="name"
					type="text"
					labelText="收件人姓名"
					rules={{ required: '請填寫收件人姓名' }}
				/>
				<Input
					register={register}
					errors={errors}
					id="email"
					type="email"
					labelText="電子信箱"
					rules={{ required: '請填寫電子信箱' }}
				/>
				<Input
					register={register}
					errors={errors}
					id="tel"
					type="tel"
					labelText="收件人聯絡電話"
					rules={{
						required: '請填寫聯絡電話',
						pattern: { value: /\d/g, message: '只能是數字' },
						minLength: { value: 8, message: '聯絡電話長度過短' },
					}}
				/>
				<Selection
					register={register}
					errors={errors}
					id="city"
					labelText="縣/市"
					rules={{ required: '請選擇縣/市' }}
				>
					<option value="">請選擇縣市</option>
					{addressData.map((city) => {
						return (
							<option value={city.CityName} key={city.CityEngName}>
								{city.CityName}
							</option>
						)
					})}
				</Selection>

				<Selection
					register={register}
					errors={errors}
					id="district"
					labelText="鄉鎮市區"
					rules={{ required: '請選擇鄉鎮市區' }}
				>
					<option value="">請選擇鄉鎮市區</option>
					{addressData
						.find((city) => city.CityName === getValues().city)
						?.AreaList?.map((area) => {
							return (
								<option value={area.AreaName} key={area.AreaEngName}>
									{area.AreaName}
								</option>
							)
						})}
				</Selection>
				<Selection
					register={register}
					errors={errors}
					id="road"
					labelText="路名"
					rules={{ required: '請選擇路名' }}
				>
					<option value="">請選擇路名</option>
					{addressData
						.find((city) => city.CityName === getValues().city)
						?.AreaList?.find((area) => area.AreaName === getValues().district)
						?.RoadList.map((road) => {
							return (
								<option value={road.RoadName} key={road.RoadName}>
									{road.RoadName}
								</option>
							)
						})}
				</Selection>
				<Input
					register={register}
					errors={errors}
					id="add"
					type="text"
					labelText="地址"
					rules={{ required: '請填寫地址' }}
				/>
				<div className="mb-2">
					<label htmlFor="message" className="form-label">
						訂單備註
					</label>
					<textarea
						className="form-control"
						{...register('message')}
						id="message"
						name="message"
						placeholder="有什麼想告訴我們嗎？"
					/>
				</div>
				<div className="d-flex justify-content-end">
					<button
						type="button"
						className="btn btn-light mt-4"
						onClick={() => navigation(-1)}
					>
						回上一頁
					</button>
					<button
						type="submit"
						className="btn btn-primary mt-4 ms-4 text-white"
					>
						下一步
					</button>
				</div>
			</form>
		</>
	)
}

export default CustomerInfoForm
