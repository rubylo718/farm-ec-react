import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Toast } from '../utils/toast-helper'
import { useAuth } from '../context/AuthContext'

const Login = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()
	const { login, isAuthenticated } = useAuth()

	const handleSubmit = async (e) => {
		if (e.key === 'Enter' || e.target.id === 'loginBtn') {
			if (username.length === 0 || password.length === 0) {
				return
			}
			const success = await login({ username, password })
			if (success) {
				Toast.fire({ icon: 'success', title: '登入成功' })
				return
			} else {
				Toast.fire({ icon: 'error', title: '登入失敗' })
				return
			}
		}
	}
	useEffect(() => {
		if (isAuthenticated) {
			navigate('/admin/products')
		}
	}, [navigate, isAuthenticated])

	return (
		<div className="container">
			<div className="row justify-content-center align-items-center vh-100">
				<div className="col-md-6 py-4 bg-light rounded-4">
					<h1 className="h3 mb-4 font-weight-normal text-center">管理者登入</h1>
					<div className="mb-2">
						<label htmlFor="email" className="form-label w-100">
							Email
							<input
								id="email"
								className="form-control"
								name="username"
								type="email"
								placeholder="Email Address"
								value={username}
								autoComplete="on"
								onChange={(e) => {
									setUsername(e.target.value)
								}}
								onKeyDown={handleSubmit}
							/>
						</label>
					</div>
					<div className="mb-2">
						<label htmlFor="password" className="form-label w-100">
							Password
							<input
								type="password"
								className="form-control"
								name="password"
								id="password"
								placeholder="password"
								value={password}
								onChange={(e) => {
									setPassword(e.target.value)
								}}
								onKeyDown={handleSubmit}
							/>
						</label>
					</div>
					<button
						id="loginBtn"
						type="button"
						className="btn btn-secondary w-100 mb-2"
						onClick={handleSubmit}
					>
						登入
					</button>
					<p className="mb-0 text-center">
						<Link to="/">回到前台</Link>
					</p>
				</div>
			</div>
		</div>
	)
}

export default Login