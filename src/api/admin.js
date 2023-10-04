import axios from 'axios'

const baseURL = 'https://ec-course-api.hexschool.io'
const apiPath = 'rubylo718'

const axiosInstance = axios.create({ baseURL })

axiosInstance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('authToken')
		if (token) {
			config.headers.Authorization = token
		}
		return config
	},
	(error) => {
		return console.error(error)
	}
)

const getProducts = async () => {
	try {
		const res = await axiosInstance.get(`/v2/api/${apiPath}/admin/products`)
		return res.data
	} catch (err) {
		console.error('[Admin-getProducts Error]: ', err)
	}
}

export { getProducts }
