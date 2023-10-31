import { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import Pagination from '../../components/Pagination'
import { getStories, postStory, editStory, deleteStory } from '../../api/admin'
import StoryTable from '../../components/admin/StoryTable'
import {
	Toast,
	DeleteConfirmation,
	Confirmation,
} from '../../utils/toast-helper'

const AdminStoriesIndex = () => {
	const [stories, setStories] = useState([])
	const [pagination, setPagination] = useState({})
	const navigate = useNavigate()

	const getStroyList = async (page = 1) => {
		const data = await getStories(page)
		setStories(data?.articles)
		setPagination(data?.pagination)
	}

	const handleSubmit = async (data) => {
		let result
		if (data.id === 'create') {
			result = await postStory(data)
		} else {
			result = await editStory(data, data.id)
		}
		if (result?.success) {
			Toast.fire({ icon: 'success', title: result.message })
			getStroyList()
			navigate('')
		} else {
			Toast.fire({ icon: 'error', title: result.message || '錯誤，請重新操作' })
		}
	}

	const handleDeleteStory = async (id) => {
		const { isConfirmed } = await DeleteConfirmation.fire()
		if (isConfirmed) {
			const result = await deleteStory(id)
			if (result?.success) {
				Confirmation.fire({ title: '已刪除文章' })
				getStroyList()
			}
		}
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
					<Link className="btn btn-primary btn-sm text-white" to="create" role="button">
						新增文章
					</Link>
					<StoryTable stories={stories} handleDeleteStory={handleDeleteStory} />
					<Pagination pagination={pagination} getDataList={getStroyList} />
				</div>
				<div className="col-6">
					<Outlet context={{ handleSubmit, navigate }} />
				</div>
			</div>
		</div>
	)
}

export default AdminStoriesIndex
