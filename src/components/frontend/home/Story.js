import { Link } from 'react-router-dom'
import Slider from 'react-slick'

const Story = ({ stories }) => {
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
					slidesToScroll: 1,
				},
			},
		],
	}
	return (
		<div className="container my-5">
			<h4>
				<Link className="text-reset text-decoration-none el-hover" to="blog">
					產地故事
				</Link>
				<Link className="float-end btn btn-outline-dark" to="blog">
					看更多
				</Link>
			</h4>
			<hr />
			<div className="container">
				<Slider {...sliderSetting}>
					{stories.map((item) => {
						return (
							<div className="p-1" key={item?.id}>
								<div className="card border-0 mb-4 position-relative">
									<Link to={`blog/${item?.id}`}>
										<img
											src={item?.image}
											className="card-img-top rounded-0 el-hover"
											alt={item?.title}
											style={{ height: '20vh', objectFit: 'cover' }}
										/>
									</Link>
									<div className="card-body p-0">
										<Link
											className="text-reset text-decoration-none el-hover"
											to={`blog/${item?.id}`}
										>
											<h5 className="mb-0 mt-4" style={{ minHeight: '48px' }}>
												{item?.title}
											</h5>
										</Link>
										<div className="d-flex justify-content-between align-items-start mt-3">
											<p className="card-text text-muted mb-0 me-1">
												{item?.description}
											</p>
											<Link
												className="btn btn-primary text-white text-nowrap"
												to={`blog/${item?.id}`}
											>
												繼續閱讀
											</Link>
										</div>
									</div>
								</div>
							</div>
						)
					})}
				</Slider>
			</div>
		</div>
	)
}

export default Story