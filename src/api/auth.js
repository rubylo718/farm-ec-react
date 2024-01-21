import axios from 'axios'

const baseURL = process.env.REACT_APP_BASE_URL

const axiosInstance = axios.create({ baseURL })

axiosInstance.interceptors.response.use(
	(res) => {
		return res
	},
	(error) => {
		// do something to record the error
		return Promise.reject(error)
	}
)

export const loginApi = async ({ username, password }) => {
	return await axiosInstance.post(`/v2/admin/signin`, { username, password })
}

export const checkPermissionApi = async (token) => {
	axiosInstance.defaults.headers.common['Authorization'] = token
	return await axiosInstance.post('/v2/api/user/check')
}
