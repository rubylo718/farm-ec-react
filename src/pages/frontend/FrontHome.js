import Banner from '../../components/frontend/home/Banner'
import FeedbackCarousel from '../../components/frontend/home/FeedbackCarousel'
import ProductCarousel from '../../components/frontend/home/ProductCarousel'
import SocialMedia from '../../components/frontend/home/SocialMedia'
import Story from '../../components/frontend/home/Story'

const FrontHome = () => {
	return (
		<>
			<Banner />
			<ProductCarousel />
			<ProductCarousel />
			<ProductCarousel />
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
