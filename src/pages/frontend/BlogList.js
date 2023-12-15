import { useOutletContext } from 'react-router-dom'
import BlogCard from '../../components/frontend/blog/BlogCard'
import Pagination from '../../components/Pagination'

const BlogList = () => {
	const { stories, pagination, getData } = useOutletContext()
	const topTwoStory = stories.slice(0, 2)
	const restStories = stories.slice(2)

	return (
		<>
			<h3 className="mb-3 el-hover">產地故事</h3>
			<div className="row g-3">
				{topTwoStory.map((story) => (
					<div className="col-sm-6" key={story.id}>
						<BlogCard story={story} size="big" />
					</div>
				))}
				{restStories.map((story) => (
					<div className="col-lg-3 col-md-4 col-sm-6" key={story.id}>
						<BlogCard story={story} size="small" />
					</div>
				))}
			</div>
			<div className="d-flex justify-content-center mt-3">
				<Pagination pagination={pagination} getDataList={getData} />
			</div>
		</>
	)
}

export default BlogList
