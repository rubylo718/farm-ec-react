import { useEffect, useState, createContext, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import * as jwt from 'jsonwebtoken-esm'
import { login, checkPermission } from '../api/auth'

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
				?.split(';')
				?.find((row) => row.startsWith('authToken'))
				?.split('=')[1]
			if (!token) {
				setIsAuthenticated(false)
				setCurrentUser(null)
				return
			}
			const result = await checkPermission(token)
			if (result.success) {
				setIsAuthenticated(true)
				const tempPayload = jwt.decode(token)
				setCurrentUser({ id: tempPayload.user_id, email: tempPayload.email })
			} else {
				setIsAuthenticated(false)
				setCurrentUser(null)
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
					const { success, token } = await login({
						username: data.username,
						password: data.password,
					})
					const tempPayload = jwt.decode(token)
					if (tempPayload) {
						setCurrentUser({
							id: tempPayload.user_id,
							email: tempPayload.email,
						})
						setIsAuthenticated(true)
					} else {
						setCurrentUser(null)
						setIsAuthenticated(false)
					}
					return success
				},
				logout: () => {
					document.cookie='authToken=;'
					setCurrentUser(null)
					setIsAuthenticated(false)
				},
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
