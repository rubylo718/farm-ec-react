import { Link } from 'react-router-dom'
import Slider from 'react-slick'

const Story = ({ stories }) => {
	const sliderSetting = {
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 4,
		dots: true,
		responsive: [
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
					slidesToShow: 2,
					slidesToScroll: 2,
				},
			},
		],
	}
	return (
		<div className="container mt-5">
			<h4>
				<Link className="text-reset text-decoration-none el-hover" to="blog">
					產地故事
				</Link>
				<Link className="float-end btn el-hover" to="blog">
					查看更多
				</Link>
			</h4>
			<hr />

			<div className="container px-0">
				<Slider {...sliderSetting}>
					{stories.map((item) => {
						return (
							<div
								className="card border-0 mb-4 position-relative px-2 el-hover"
								key={item?.id}
							>
								<Link
									className="text-reset text-decoration-none"
									to={`blog/${item?.id}`}
								>
									<img
										src={item?.image}
										className="card-img-top rounded-2 object-fit-cover card-img-height"
										alt={item?.title}
									/>
									<div className="card-body p-0">
										<h5 className="mb-0 mt-4 card-text-min-height ">
											{item?.title}
										</h5>
										<div className="d-block mt-2">
											<p className="card-text text-muted mb-0 me-1 card-text-min-height">
												{item?.description}
											</p>
										</div>
									</div>
								</Link>
							</div>
						)
					})}
				</Slider>
			</div>
		</div>
	)
}

export default Story
