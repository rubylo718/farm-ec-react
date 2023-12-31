import { useState, useEffect } from 'react'
import Banner from '../../components/frontend/home/Banner'
import FeedbackCarousel from '../../components/frontend/home/FeedbackCarousel'
import ProductCarouselCollection from '../../components/frontend/home/ProductCarouselCollection'
import SocialMedia from '../../components/frontend/home/SocialMedia'
import Story from '../../components/frontend/home/Story'
import Spinner from '../../components/Spinner'
import { getProductsCat, getStoriesFront } from '../../api/front'
import feedback from '../../assets/feedback.json'

const FrontHome = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [allData, setAllData] = useState([
		{ id: 1, products: [] },
		{ id: 2, products: [] },
		{ id: 3, products: [] },
	])
	const [stories, setStories] = useState([])

	const getAllProductList = async () => {
		try {
			setIsLoading(true)
			const res1 = getProductsCat(1, '新鮮蔬菜')
			const res2 = getProductsCat(1, '當季水果')
			const res3 = getProductsCat(1, '乾貨')

			const results = await Promise.all([res1, res2, res3])
			setAllData([
				{ id: 1, products: [...results[0].products] },
				{ id: 2, products: [...results[1].products] },
				{ id: 3, products: [...results[2].products] },
			])
			setIsLoading(false)
		} catch (err) {
			return err.response.data
		}
	}

	const getStories = async () => {
		try {
			const result = await getStoriesFront(1)
			setStories(result.articles.filter((item) => item.isPublic).slice(0, 6))
		} catch (err) {
			return err.response.data
		}
	}

	useEffect(() => {
		getAllProductList()
		getStories()
	}, [])

	return (
		<>
			<Spinner isLoading={isLoading} />
			<Banner />
			<ProductCarouselCollection allData={allData} />
			<div className="bg-light">
				<FeedbackCarousel feedback={feedback} />
			</div>
			<Story stories={stories} />
			<div className="bg-light">
				<SocialMedia />
			</div>
		</>
	)
}

export default FrontHome
