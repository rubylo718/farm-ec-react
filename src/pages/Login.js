import { useState } from 'react'
import { Link } from 'react-router-dom'
import { login } from '../api/auth'

const Login = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = async () => {
		if (username.length === 0 || password.length === 0) {
			return
		}
		const { success } = await login({ username, password })
		console.log(success)
	}
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
								onChange={(e) => {
									setUsername(e.target.value)
								}}
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
							/>
						</label>
					</div>
					<button
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
