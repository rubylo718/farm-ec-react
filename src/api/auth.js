import axios from 'axios'

const baseURL = process.env.REACT_APP_BASE_URL

const axiosInstance = axios.create({ baseURL })

axios.interceptors.response.use(
	(res) => {
		return res
	},
	(error) => {
		return Promise.reject(error)
	}
)

const login = async ({ username, password }) => {
	try {
		const { data } = await axiosInstance.post(`/v2/admin/signin`, {
			username,
			password,
		})
		const { token, expired } = data
		if (token) {
			document.cookie = `authToken=${token}; expires=${new Date(expired)}`
			return { success: true, ...data }
		} else {
			return data
		}
	} catch (err) {
		return { success: false, ...err.response.data }
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
