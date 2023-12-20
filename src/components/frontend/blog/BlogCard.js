import { Link } from 'react-router-dom'
import { unixToDateString } from '../../../utils/dayjs-helper'

const BlogCard = ({ story, size }) => {
	return (
		<div className="card mb-3 text-center h-100 el-hover">
			<img
				src={story.image}
				className={`card-img-top object-fit-cover ${
					size === `big` ? `blog-card-img-lg` : `blog-card-img`
				}`}
				alt={story.title}
			/>
			<div className="card-body">
				<h4 className={`card-title ${size === `small` ? `fs-5` : ''}`}>
					{story.title}
				</h4>

				<p className="card-text my-2 text-secondary">{story.description}</p>

				<small className="mb-1 ">{unixToDateString(story.create_at)}</small>
				<br />
				<small className="mb-0">作者：{story.author}</small>
				<Link to={story.id} className="stretched-link"></Link>
			</div>
		</div>
	)
}

export default BlogCard
