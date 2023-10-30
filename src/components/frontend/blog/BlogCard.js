import { Link } from 'react-router-dom'
import { unixToDateString } from '../../../utils/dayjs-helper'

const BlogCard = ({ story, size }) => {
	return (
		<div className="card mb-3 text-center">
			<Link to={story.id}>
				<img
					src={story.image}
					className="card-img-top"
					style={{
						height: size === 'big' ? '300px' : '150px',
						objectFit: 'cover',
					}}
					alt="..."
				/>
			</Link>
			<div className="card-body ">
				<Link className="text-reset text-decoration-none" to={story.id}>
					<h4 className={`card-title ${size === `small` ? `fs-5` : ''}`}>
						{story.title}
					</h4>
				</Link>
				<small className="text-mute text-secondary">
					{unixToDateString(story.create_at)}
					<br />
					作者：{story.author}
				</small>
				<p className="card-text mt-2">{story.description}</p>
				<Link to={story.id} className="btn btn-outline-primary">
					繼續閱讀
				</Link>
			</div>
		</div>
	)
}

export default BlogCard
