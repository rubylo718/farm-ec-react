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

const postProduct = async (inputData) => {
	try {
		const res = await axiosInstance.post(`/v2/api/${apiPath}/admin/product`, {
			data: inputData,
		})
		return res.data
	} catch (err) {
		console.error('[Admin-postProduct Error]: ', err)
	}
}

const editProduct = async (inputData, id) => {
	try {
		const res = await axiosInstance.put(`/v2/api/${apiPath}/admin/product/${id}`, {
			data: inputData
		})
		return res.data
	} catch (err) {
		console.error('[Admin-editProduct Error]: ', err)
	}
}

const deleteProduct = async (id) => {
	try { 
		const res = await axiosInstance.delete(`/v2/api/${apiPath}/admin/product/${id}`)
		return res.data
	} catch(err) {
		console.error('[Admin-deleteProduct Error]: ', err)
	}
}
export { getProducts, postProduct, editProduct, deleteProduct }
