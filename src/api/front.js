import axios from 'axios'

const baseURL = process.env.REACT_APP_BASE_URL
const apiPath = process.env.REACT_APP_API_PATH

const axiosInstance = axios.create({
	baseURL: `${baseURL}/v2/api/${apiPath}/`,
})

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
export const getProductsCat = async (page, category) => {
	return await axiosInstance.get(`/products?page=${page}&category=${category}`)
}

export const getProductDetail = async (id) => {
	return await axiosInstance.get(`/product/${id}`)
}

export const getAllProducts = async () => {
	return await axiosInstance.get(`products/all`)
}

// carts
export const postCart = async (data) => {
	return await axiosInstance.post(`cart`, data)
}

export const getCart = async () => {
	return await axiosInstance.get(`cart`)
}

export const deleteCartItem = async (id) => {
	return await axiosInstance.delete(`cart/${id}`)
}

export const deleteCartAll = async () => {
	return await axiosInstance.delete('carts')
}

export const editCartItem = async (item, newQty) => {
	return await axiosInstance.put(`cart/${item.id}`, {
		data: {
			product_id: item.product_id,
			qty: newQty,
		},
	})
}

// order and payment
export const postOrder = async (user, message) => {
	return await axiosInstance.post(`order`, { data: { user, message } })
}

export const postPay = async (id) => {
	return await axiosInstance.post(`pay/${id}`)
}

export const getOrder = async (id) => {
	return await axiosInstance.get(`order/${id}`)
}

//coupon
export const postCouponFront = async (code) => {
	return await axiosInstance.post('coupon', { data: { code } })
}

//story
export const getStoriesFront = async (page) => {
	return await axiosInstance.get(`articles?page=${page}`)
}

export const getStoryFront = async (id) => {
	return await axiosInstance.get(`article/${id}`)
}
