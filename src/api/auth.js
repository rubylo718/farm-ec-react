import axios from 'axios'

const baseURL = 'https://ec-course-api.hexschool.io'

const axiosInstance = axios.create({ baseURL })

export const login = async ({ username, password }) => {
	try {
		const { data } = await axiosInstance.post(`/v2/admin/signin`, {
			username,
			password,
		})
		const { token } = data
		if (token) {
			localStorage.setItem('authToken', token)
			return { success: true, ...data }
		} else {
			return data
		}
	} catch (err) {
		console.error('[Login Failed]: ', err)
	}
}
