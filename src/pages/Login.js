import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Toast } from '../utils/toast-helper'
import { useAuth } from '../context/AuthContext'
import Spinner from '../components/Spinner'
import Input from '../components/form/Input'

const Login = () => {
	const [isLoading, setIsLoading] = useState(false)
	const navigate = useNavigate()
	const { login, isAuthenticated } = useAuth()
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({ mode: 'onSubmit' })

	const onSubmit = async (data) => {
		setIsLoading(true)
		const success = await login({
			username: data.email,
			password: data.password,
		})
		setIsLoading(false)
		if (success) {
			Toast.fire({ icon: 'success', title: '登入成功' })
		} else {
			Toast.fire({ icon: 'error', title: '登入失敗，請重新輸入' })
			reset()
		}
		return
	}
	useEffect(() => {
		if (isAuthenticated) {
			navigate('/admin/products')
		}
	}, [navigate, isAuthenticated])

	return (
		<div className="container">
			<Spinner isLoading={isLoading} />
			<div className="row justify-content-center align-items-center vh-100">
				<form
					className="col-10 col-md-8 col-lg-6 py-4 bg-light "
					onSubmit={handleSubmit(onSubmit)}
				>
					<h1 className="h3 mb-4 font-weight-normal text-center">管理者登入</h1>
					<div className="mb-2">
						<Input
							register={register}
							errors={errors}
							id="email"
							type="email"
							labelText="帳號（電子信箱）"
							rules={{
								required: '請填寫帳號',
							}}
						/>
					</div>
					<div className="mb-2">
						<Input
							register={register}
							errors={errors}
							id="password"
							type="password"
							labelText="密碼"
							rules={{
								required: '請填寫密碼',
								minLength: {
									value: 8,
									message: '密碼長度過短',
								},
							}}
						/>
					</div>
					<button type="submit" className="btn btn-secondary w-100 my-2">
						登入
					</button>
					<p className="mb-0 text-center">
						<Link to="/">回到前台</Link>
					</p>
				</form>
			</div>
		</div>
	)
}

export default Login
