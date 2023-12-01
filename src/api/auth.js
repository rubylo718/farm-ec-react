import axios from 'axios'

const baseURL = 'https://ec-course-api.hexschool.io'

const axiosInstance = axios.create({ baseURL })

const login = async ({ username, password }) => {
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
		return { success: false, ...err.response.data}
	}
}

const checkPermission = async (token) => {
	try {
		axiosInstance.defaults.headers.common['Authorization'] = token
		const res = await axiosInstance.post('/v2/api/user/check')
		return res.data
	} catch (err) {
		return err.response.data
	}
}

export { login, checkPermission }
