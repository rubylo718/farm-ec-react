import axios from 'axios'

const baseURL = process.env.REACT_APP_BASE_URL
const apiPath = process.env.REACT_APP_API_PATH

const axiosInstance = axios.create({
	baseURL: `${baseURL}/v2/api/${apiPath}/admin`,
})

axiosInstance.interceptors.request.use(
	(config) => {
		const token = document.cookie
			?.split('; ')
			?.find((row) => row.startsWith('authToken='))
			?.split('=')[1]
		if (token) {
			config.headers.Authorization = token
		}
		return config
	},
	(error) => {
		// do something to record the error
		return Promise.reject(error)
	}
)

axiosInstance.interceptors.response.use(
	(res) => {
		return res
	},
	(error) => {
		// do something to record the error
		return Promise.reject(error)
	}
)

// products
export const getProducts = async (page) => {
	return await axiosInstance.get(`/products?page=${page}`)
}

export const postProduct = async (data) => {
	return await axiosInstance.post(`/product`, { data })
}

export const editProduct = async (data, id) => {
	return await axiosInstance.put(`/product/${id}`, { data })
}

export const deleteProduct = async (id) => {
	await axiosInstance.delete(`/product/${id}`)
}

// coupon
export const getCoupons = async (page) => {
	return await axiosInstance.get(`/coupons?page=${page}`)
}

export const postCoupon = async (data) => {
	return await axiosInstance.post(`/coupon`, { data })
}

export const editCoupon = async (data, id) => {
	return await axiosInstance.put(`/coupon/${id}`, { data })
}

export const deleteCoupon = async (id) => {
	return await axiosInstance.delete(`/coupon/${id}`)
}

// order
export const getOrders = async (page) => {
	return axiosInstance.get(`/orders?page=${page}`)
}

export const editOrder = async (data, id) => {
	return await axiosInstance.put(`/order/${id}`, { data })
}

export const deleteOrder = async (id) => {
	return await axiosInstance.delete(`/order/${id}`)
}

// stories
export const getStories = async (page) => {
	return await axiosInstance.get(`/articles?page=${page}`)
}

export const getStory = async (id) => {
	return await axiosInstance.get(`article/${id}`)
}

export const editStory = async (data, id) => {
	return await axiosInstance.put(`article/${id}`, { data })
}

export const postStory = async (data) => {
	return await axiosInstance.post('article', { data })
}

export const deleteStory = async (id) => {
	return await axiosInstance.delete(`article/${id}`)
}
