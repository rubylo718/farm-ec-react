import { useState, useEffect } from 'react'
import Banner from '../../components/frontend/home/Banner'
import FeedbackCarousel from '../../components/frontend/home/FeedbackCarousel'
import ProductCarousel from '../../components/frontend/home/ProductCarousel'
import SocialMedia from '../../components/frontend/home/SocialMedia'
import Story from '../../components/frontend/home/Story'
import { getProductsCat } from '../../api/front'
import { ProductContext } from '../../context/ProductContext'

const FrontHome = () => {
	const [products, setProducts] = useState([])
	const getDataList = async (page = 1, category = '新鮮蔬菜') => {
		const res = await getProductsCat(page, category)
		setProducts(res.products)
	}

	useEffect(() => {
		getDataList()
	}, [])

	return (
		<>
			<Banner />
			<ProductContext.Provider value={products}>
				<ProductCarousel />
				{/* <ProductCarousel />
					<ProductCarousel /> */}
			</ProductContext.Provider>
			<div className="bg-light">
				<FeedbackCarousel />
			</div>
			<Story />
			<div className="bg-light">
				<SocialMedia />
			</div>
		</>
	)
}

export default FrontHome
