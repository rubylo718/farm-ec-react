import ProductCard from '../ProductCard'
import Slider from 'react-slick'

const ProductCarousel = ({ data }) => {
	const sliderSetting = {
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 3,
		responsive: [
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				},
			},
		],
	}

	return (
		<>
			<div className="container">
				<Slider {...sliderSetting}>
					{data?.products.map((item) => (
						<div className="p-1" key={item.id}>
							<ProductCard item={item} />
						</div>
					))}
				</Slider>
			</div>
		</>
	)
}

export default ProductCarousel
