import ProductCard from '../ProductCard'
import Slider from 'react-slick'

const ProductCarousel = ({ data }) => {
	const sliderSetting = {
		infinite: true,
		slidesToShow: 5,
		slidesToScroll: 5,
		dots: true,
		responsive: [
			{
				breakpoint: 320,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
				},
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					arrows: false,
				},
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
				},
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 4,
				},
			},
		],
	}

	return (
		<div className="container px-0 w-100">
			<Slider {...sliderSetting}>
				{data?.products.map((item) => (
					<div className="p-0" key={item.id}>
						<ProductCard item={item} />
					</div>
				))}
			</Slider>
		</div>
	)
}

export default ProductCarousel
