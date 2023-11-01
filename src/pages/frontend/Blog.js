import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { getStoriesFront } from '../../api/front'

const Blog = () => {
	const [stories, setStories] = useState([])
	const [pagination, setPagination] = useState({})

	const getData = async (page = 1) => {
		const result = await getStoriesFront(page)
		setStories(result.articles)
		setPagination(result.pagination)
	}

	useEffect(() => {
		getData()
	}, [])

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [stories])

	return (
		<div className="container my-5">
			<Outlet context={{ stories, pagination, getData }} />
		</div>
	)
}

export default Blog
