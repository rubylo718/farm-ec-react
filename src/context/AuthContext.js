import { useEffect, useState, createContext, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import * as jwt from 'jsonwebtoken-esm'
import { loginApi, checkPermissionApi } from '../api/auth'

const defaultAuthContext = {
	isAuthenticated: false,
	currentUser: null,
	login: null,
	logout: null,
}
const AuthContext = createContext(defaultAuthContext)

export const useAuth = () => useContext(AuthContext)
export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [currentUser, setCurrentUser] = useState()
	const { pathname } = useLocation()

	useEffect(() => {
		const checkTokenIsValid = async () => {
			const token = document.cookie
				?.split('; ')
				?.find((row) => row.startsWith('authToken='))
				?.split('=')[1]
			if (!token) {
				setIsAuthenticated(false)
				setCurrentUser(null)
				return
			}
			try {
				await checkPermissionApi(token)
				setIsAuthenticated(true)
				const tempPayload = jwt.decode(token)
				setCurrentUser({ id: tempPayload.user_id, email: tempPayload.email })
			} catch (error) {
				setIsAuthenticated(false)
				setCurrentUser(null)
				return error.response.data
			}
		}
		if (pathname.startsWith('/admin') || pathname.startsWith('/login')) {
			checkTokenIsValid()
		}
	}, [pathname])

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				currentUser,
				login: async (data) => {
					try {
						const res = await loginApi({
							username: data.username,
							password: data.password,
						})
						const { token, expired } = res.data
						if (token) {
							document.cookie = `authToken=${token}; expires=${new Date(
								expired
							)}`
						} else {
							throw new Error('Token does not exist.')
						}
						const tempPayload = jwt.decode(token)
						if (tempPayload) {
							setCurrentUser({
								id: tempPayload.user_id,
								email: tempPayload.email,
							})
							setIsAuthenticated(true)
						} else {
							throw new Error('Token is invalid.')
						}
						return { success: true }
					} catch (error) {
						setCurrentUser(null)
						setIsAuthenticated(false)
						return { success: false }
					}
				},
				logout: () => {
					document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT'
					setCurrentUser(null)
					setIsAuthenticated(false)
				},
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
