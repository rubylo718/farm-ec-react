import { useState, useEffect, useCallback } from 'react'
import { useParams, useOutletContext, useNavigate } from 'react-router-dom'
import { faHandPointer } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Spinner from '../../components/Spinner'
import BlogCard from '../../components/frontend/blog/BlogCard'
import { getStoryFront } from '../../api/front'
import { unixToDateString } from '../../utils/dayjs-helper'
import { Toast } from '../../utils/toast-helper'

const BlogContent = () => {
	const [story, setStory] = useState({})
	const [isLoading, setIsLoading] = useState(false)
	const { stories } = useOutletContext()
	const { id } = useParams()
	const navigate = useNavigate()

	const getStory = useCallback(
		async (id) => {
			setIsLoading(true)
			try {
				const res = await getStoryFront(id)
				setStory(res.data.article)
			} catch {
				setStory({})
				Toast.fire({ icon: 'error', title: '取得資料發生錯誤，將返回文章列表' })
				setTimeout(() => {
					navigate('/blog')
				}, 1500)
			} finally {
				setIsLoading(false)
			}
		},
		[navigate]
	)

	useEffect(() => {
		getStory(id)
	}, [getStory, id])

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
						className="card-img-top w-100 object-fit-cover blog-img rounded-2"
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
							<div className="col-6 col-lg-12 mb-3" key={item.id}>
								<BlogCard story={item} size="small" />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default BlogContent
