import { useState, useEffect } from 'react'
import BlogCard from '../../components/frontend/blog/BlogCard'
import Pagination from '../../components/Pagination'
import { getStoriesFront } from '../../api/front'

const Blog = () => {
	const [topTwoStory, setTopTwoStory] = useState([])
	const [restStories, setRestStories] = useState([])
	const [pagination, setPagination] = useState({})

	const getData = async (page = 1) => {
		const result = await getStoriesFront(page)
		setTopTwoStory(result.articles.slice(0, 2))
		setRestStories(result.articles.slice(2))
		setPagination(result.pagination)
	}

	useEffect(() => {
		getData()
	}, [])

	return (
		<div className="container my-5">
			<h3 className="mb-3">產地故事</h3>
			<div className="row mb-3">
				{topTwoStory.map((story) => (
					<div className="col-md-6" key={story.id}>
						<BlogCard story={story} size="big" />
					</div>
				))}
				{restStories.map((story) => (
					<div className="col-lg-3 col-md-4 col-sm-6" key={story.id}>
						<BlogCard story={story} size="small" />
					</div>
				))}
			</div>
			<div className="d-flex justify-content-center">
				<Pagination pagination={pagination} getDataList={getData} />
			</div>
		</div>
	)
}

export default Blog
