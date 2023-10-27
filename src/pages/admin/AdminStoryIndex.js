import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Pagination from '../../components/Pagination'
import { getStories } from '../../api/admin'
import StoryTable from '../../components/admin/StoryTable'

const AdminStoriesIndex = () => {
	const [stories, setStories] = useState([])
	const [pagination, setPagination] = useState({})

	const getStroyList = async () => {
		const data = await getStories()
		setStories(data?.articles)
		setPagination(data?.pagination)
	}

	useEffect(() => {
		getStroyList()
	}, [])

	return (
		<div className="p-3">
			<h1 className="h3">文章列表</h1>
			<hr />
			<div className="row">
				<div className="col-6">
					<StoryTable stories={stories} />
					<Pagination pagination={pagination} getDataList={getStroyList} />
				</div>
				<div className="col-6">
					<Outlet />
				</div>
			</div>
		</div>
	)
}

export default AdminStoriesIndex
