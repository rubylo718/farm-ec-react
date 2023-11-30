import { useState, useEffect } from 'react'
import {
	Link,
	useParams,
	useOutletContext,
	useNavigate,
} from 'react-router-dom'
import { faHandPointer } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Spinner from '../../components/Spinner'
import { getStoryFront } from '../../api/front'
import { unixToDateString } from '../../utils/dayjs-helper'

const BlogContent = () => {
	const [story, setStory] = useState({})
	const [isLoading, setIsLoading] = useState(false)
	const { stories } = useOutletContext()
	const { id } = useParams()
	const navigate = useNavigate()

	const getStory = async (id) => {
		setIsLoading(true)
		const result = await getStoryFront(id)
		setStory(result.article)
		setIsLoading(false)
	}

	useEffect(() => {
		getStory(id)
	}, [id])

	return (
		<div className="container mt-5">
			<Spinner isLoading={isLoading} />
			<div className="row justify-content-around">
				<div className="col-lg-8">
					<h2> {story?.title}</h2>
					<p className="text-secondary">
						{unixToDateString(story?.create_at)} 作者：{story?.author}
					</p>
					<img
						src={story.image}
						className="card-img-top"
						style={{
							width: '100%',
							maxHeight: '20rem',
							objectFit: 'cover',
						}}
						alt={story.title}
					/>
					<p className="my-4 fs-5 text-secondary">{story.description}</p>
					{story?.content?.split('\n').map((item, i) => (
						<p key={i} className="fs-5">
							{item}
						</p>
					))}
					<button
						type="button"
						className="btn btn-primary btn-lg text-white my-4"
						onClick={() => navigate(`/products/keyword?query=${story.tag}`)}
					>
						<FontAwesomeIcon icon={faHandPointer} className="me-1" />
						立即選購相關商品
					</button>
					<br />
					<button
						type="button"
						className="btn btn-outline-secondary"
						onClick={() => navigate('/blog')}
					>
						回文章列表
					</button>
				</div>
				<div className="col-lg-3">
					<h4 className="text-center my-3">推薦文章</h4>
					<hr className="mb-4" />
					<div className="row">
						{stories.slice(-4).map((item) => (
							<div className="col-6 col-lg-12" key={item.id}>
								<div className="card mb-3 text-center">
									<Link to={'/blog/' + item.id}>
										<img
											src={item.image}
											className="card-img-top el-hover"
											style={{ height: '150px', objectFit: 'cover' }}
											alt={item.title}
										/>
									</Link>
									<div className="card-body">
										<Link
											to={'/blog/' + item.id}
											className="text-reset text-decoration-none el-hover"
										>
											<h5 className="card-title">{item.title}</h5>
										</Link>
										<small className="text-mute text-secondary">
											{unixToDateString(item.create_at)}
											<br />
											作者：{item.author}
										</small>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default BlogContent
