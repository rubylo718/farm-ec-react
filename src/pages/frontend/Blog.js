import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { getStoriesFront } from '../../api/front'
import Spinner from '../../components/Spinner'

const Blog = () => {
	const [stories, setStories] = useState([])
	const [pagination, setPagination] = useState({})
	const [isLoading, setIsLoading] = useState(false)

	const getData = async (page = 1) => {
		setIsLoading(true)
		const result = await getStoriesFront(page)
		setStories(result.articles)
		setPagination(result.pagination)
		setIsLoading(false)
	}

	useEffect(() => {
		getData()
	}, [])

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [stories])

	return (
		<div className="container my-5">
			<Spinner isLoading={isLoading} />
			<Outlet context={{ stories, pagination, getData }} />
		</div>
	)
}

export default Blog
