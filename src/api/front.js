import axios from 'axios'

const baseURL = 'https://ec-course-api.hexschool.io'
const apiPath = 'rubylo718'

const axiosInstance = axios.create({
	baseURL: `${baseURL}/v2/api/${apiPath}/`,
})

const getProductsCat = async (page, category) => {
	try {
		const res = await axiosInstance.get(
			`/products?page=${page}&category=${category}`
		)
		return res.data
	} catch (err) {
		return err.response.data
	}
}

const getProductDetail = async (id) => {
	try {
		const res = await axiosInstance.get(`/product/${id}`)
		return res.data
	} catch (err) {
		return err.response.data
	}
}

const postCart = async (data) => {
	try {
		const res = await axiosInstance.post(`cart`, data)
		return res.data
	} catch (err) {
		return err.response.data
	}
}

const getCart = async () => {
	try {
		const res = await axiosInstance.get(`cart`)
		return res.data.data
	} catch (err) {
		return err.response.data
	}
}

const deleteCartItem = async (id) => {
	try {
		const res = await axiosInstance.delete(`cart/${id}`)
		return res.data
	} catch (err) {
		return err.response.data
	}
}

const editCartItem = async (item, newQty) => {
	try {
		const res = await axiosInstance.put(`cart/${item.id}`, {
			data: {
				product_id: item.product_id,
				qty: newQty,
			},
		})
		return res.data
	} catch (err) {
		return err.response.data
	}
}

const postOrder = async (user, message) => {
	try {
		const res = await axiosInstance.post(`order`, { data: { user, message } })
		return res.data
	} catch (err) {
		return err.response.data
	}
}

const postPay = async (id) => {
	try {
		const res = await axiosInstance.post(`pay/${id}`)
		return res.data
	} catch (err) {
		return err.response.data
	}
}

const getOrder = async (id) => {
	try {
		const res = await axiosInstance.get(`order/${id}`)
		return res.data
	} catch (err) {
		return err.response.data
	}
}

const getAllProducts = async () => {
	try {
		const res = await axiosInstance.get(`products/all`)
		return res.data
	} catch (err) {
		return err.response.data
	}
}

//coupon
const postCouponFront = async (code) => {
	try {
		const res = await axiosInstance.post('coupon', { data: { code } })
		return res.data
	} catch (err) {
		return err.response.data
	}
}

//story
const getStoriesFront = async (page) => {
	try {
		const res = await axiosInstance.get(`articles?page=${page}`)
		return res.data
	} catch (err) {
		return err.response.data
	}
}

const getStoryFront = async (id) => {
	try {
		const res = await axiosInstance.get(`article/${id}`)
		return res.data
	} catch (err) {
		return err.response.data
	}
}

export {
	getProductsCat,
	getProductDetail,
	postCart,
	getCart,
	deleteCartItem,
	editCartItem,
	postOrder,
	postPay,
	getOrder,
	getAllProducts,
	postCouponFront,
	getStoriesFront,
	getStoryFront,
}
