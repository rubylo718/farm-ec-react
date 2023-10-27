import axios from 'axios'

const baseURL = 'https://ec-course-api.hexschool.io'
const apiPath = 'rubylo718'

const axiosInstance = axios.create({
	baseURL: `${baseURL}/v2/api/${apiPath}/admin`,
})

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

const getProducts = async (page) => {
	try {
		const res = await axiosInstance.get(`/products?page=${page}`)
		return res.data
	} catch (err) {
		console.error('[Admin-getProducts Error]: ', err)
		return err.response.data
	}
}

const postProduct = async (data) => {
	try {
		const res = await axiosInstance.post(`/product`, { data })
		return res.data
	} catch (err) {
		console.error('[Admin-postProduct Error]: ', err)
		return err.response.data
	}
}

const editProduct = async (data, id) => {
	try {
		const res = await axiosInstance.put(`/product/${id}`, { data })
		return res.data
	} catch (err) {
		console.error('[Admin-editProduct Error]: ', err)
		return err.response.data
	}
}

const deleteProduct = async (id) => {
	try {
		const res = await axiosInstance.delete(`/product/${id}`)
		return res.data
	} catch (err) {
		console.error('[Admin-deleteProduct Error]: ', err)
		return err.response.data
	}
}

// coupon
const getCoupons = async (page) => {
	try {
		const res = await axiosInstance.get(`/coupons?page=${page}`)
		return res.data
	} catch (err) {
		console.error('[Admin-getCoupons Error]: ', err)
		return err.response.data
	}
}

const postCoupon = async (data) => {
	try {
		const res = await axiosInstance.post(`/coupon`, { data })
		return res.data
	} catch (err) {
		console.error('[Admin-postCoupon Error]: ', err)
		return err.response.data
	}
}

const editCoupon = async (data, id) => {
	try {
		const res = await axiosInstance.put(`/coupon/${id}`, { data })
		return res.data
	} catch (err) {
		console.error('[Admin-editCoupon Error]: ', err)
		return err.response.data
	}
}

const deleteCoupon = async (id) => {
	try {
		const res = await axiosInstance.delete(`/coupon/${id}`)
		return res.data
	} catch (err) {
		console.error('[Admin-deleteCoupon Error]: ', err)
		return err.response.data
	}
}

// order
const getOrders = async (page) => {
	try {
		const res = await axiosInstance.get(`/orders?page=${page}`)
		return res.data
	} catch (err) {
		console.error('[Admin-getOrders Error]: ', err)
		return err.response.data
	}
}

const editOrder = async (data, id) => {
	try {
		const res = await axiosInstance.put(`/order/${id}`, { data })
		return res.data
	} catch (err) {
		console.error('[Admin-editOrder Error]: ', err)
		return err.response.data
	}
}

// stories
const getStories = async () => {
	try {
		const res = await axiosInstance.get('articles')
		return res.data
	} catch (err) {
		return err.response.data
	}
}

const getStory = async (id) => {
	try {
		const res = await axiosInstance.get(`article/${id}`)
		return res.data
	} catch (err) {
		return err.response.data
	}
}

const editStory = async (data, id) => {
	try {
		const res = await axiosInstance.put(`article/${id}`, { data })
		return res.data
	} catch (err) {
		return err.response.data
	}
}

const postStory = async (data) => {
	try {
		const res = await axiosInstance.post('article', { data })
		return res.data
	} catch (err) {
		return err.response.data
	}
}

const deleteStory = async (id) => {
	try {
		const res = await axiosInstance.delete(`article/${id}`)
		return res.data
	} catch (err) {
		return err.response.data
	}
}

export {
	getProducts,
	postProduct,
	editProduct,
	deleteProduct,
	getCoupons,
	postCoupon,
	editCoupon,
	deleteCoupon,
	getOrders,
	editOrder,
	getStories,
	getStory,
	postStory,
	editStory,
	deleteStory,
}
