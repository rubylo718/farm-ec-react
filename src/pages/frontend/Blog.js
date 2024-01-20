import { useState, useEffect, useCallback } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { getStoriesFront } from '../../api/front'
import Spinner from '../../components/Spinner'
import { Toast } from '../../utils/toast-helper'

const Blog = () => {
	const [stories, setStories] = useState([])
	const [pagination, setPagination] = useState({})
	const [isLoading, setIsLoading] = useState(false)
	const navigation = useNavigate()

	const getData = useCallback(
		async (page = 1) => {
			setIsLoading(true)
			try {
				const res = await getStoriesFront(page)
				setStories(res.data.articles)
				setPagination(res.data.pagination)
			} catch (error) {
				setStories([])
				setPagination({})
				Toast.fire({ icon: 'error', title: '取得資料錯誤，將返回首頁' })
				setTimeout(() => {
					navigation('/')
				}, 1500)
			} finally {
				setIsLoading(false)
			}
		},
		[navigation]
	)

	useEffect(() => {
		getData()
	}, [getData])

	return (
		<div className="container my-5">
			<Spinner isLoading={isLoading} />
			<Outlet context={{ stories, pagination, getData }} />
		</div>
	)
}

export default Blog
