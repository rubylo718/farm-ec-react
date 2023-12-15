import { Link } from 'react-router-dom'
import { unixToDateString } from '../../../utils/dayjs-helper'

const BlogCard = ({ story, size }) => {
	return (
		<div className="card mb-3 text-center h-100">
			<Link to={story.id}>
				<img
					src={story.image}
					className="card-img-top el-hover"
					style={{
						height: size === 'big' ? '30vw' : '20vw',
						maxHeight: size === 'big' ? '250px' : '150px',
						objectFit: 'cover',
					}}
					alt={story.title}
				/>
			</Link>
			<div className="card-body">
				<Link
					className="text-reset text-decoration-none el-hover"
					to={story.id}
				>
					<h4 className={`card-title ${size === `small` ? `fs-5` : ''}`}>
						{story.title}
					</h4>
				</Link>
				<p className="card-text mt-2 text-secondary">{story.description}</p>
				<div className="mb-2">
					<small className="text-mute text-secondary">
						{unixToDateString(story.create_at)}
						<br />
						作者：{story.author}
					</small>
				</div>
				<Link to={story.id} className="btn btn-primary text-white">
					繼續閱讀
				</Link>
			</div>
		</div>
	)
}

export default BlogCard
