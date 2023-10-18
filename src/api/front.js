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
		console.error(err)
	}
}

const deleteCartItem = async (id) => {
	try {
		const res = await axiosInstance.delete(`cart/${id}`)
		return res.data
	} catch (err) {
		console.error(err)
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
		console.error(err)
	}
}

export { getProductsCat, getProductDetail, postCart, getCart, deleteCartItem, editCartItem }
