import { useState, useEffect } from 'react'
import {
	Link,
	useParams,
	useOutletContext,
	useNavigate,
} from 'react-router-dom'
import { faHandPointer } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getStoryFront } from '../../api/front'
import { unixToDateString } from '../../utils/dayjs-helper'

const BlogContent = () => {
	const [story, setStory] = useState({})
	const { stories } = useOutletContext()
	const { id } = useParams()
	const navigate = useNavigate()

	const getStory = async (id) => {
		const result = await getStoryFront(id)
		setStory(result.article)
	}

	useEffect(() => {
		getStory(id)
	}, [id])

	return (
		<div className="container mt-5">
			<div className="row justify-content-around">
				<div className="col-md-8">
					<h2> {story?.title}</h2>
					<p className="text-secondary">
						{unixToDateString(story?.create_at)} 作者：{story?.author}
					</p>
					<img
						src={story.image}
						className="card-img-top el-hover"
						style={{
							width: '100%',
							maxHeight: '20rem',
							objectFit: 'cover',
						}}
						alt="..."
					/>
					<p className="my-4 fs-5 text-secondary">{story.description}</p>
					{story?.content?.split('\n').map((item, i) => (
						<p key={i} className="lh-lg fs-5">
							{item}
						</p>
					))}
					<button
						className="btn btn-primary btn-lg text-white my-4"
						onClick={() => navigate(`/products/keyword?query=${story.tag}`)}
					>
						<FontAwesomeIcon icon={faHandPointer} className="me-1" />
						立即選購相關商品
					</button>
					<br />
					<button
						className="btn btn-outline-secondary"
						onClick={() => navigate('/blog')}
					>
						回文章列表
					</button>
				</div>
				<div className="col-md-3">
					<h4 className="text-center">推薦文章</h4>
					<hr />
					{stories.slice(-3).map((item) => (
						<div className="card mb-3 text-center" key={item.id}>
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
									{unixToDateString(item.create_at)} 作者：{item.author}
								</small>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default BlogContent
