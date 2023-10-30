import { Link } from 'react-router-dom'
import { unixToDateString } from '../../../utils/dayjs-helper'

const BlogCard = ({ story, size }) => {
	return (
		<div className="card mb-3 text-center">
			<img
				src={story.image}
				className="card-img-top"
				style={{
					height: size === 'big' ? '300px' : '150opx',
					objectFit: 'cover',
				}}
				alt="..."
			/>
			<div className="card-body ">
				<h4 className="card-title">{story.title}</h4>
				<small className="text-mute text-secondary">
					{unixToDateString(story.create_at)}
					<br />
					作者：{story.author}
				</small>
				<p className="card-text mt-2">{story.description}</p>
				<Link to="#" className="btn btn-outline-primary">
					繼續閱讀
				</Link>
			</div>
		</div>
	)
}

export default BlogCard