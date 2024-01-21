import { useEffect, useState, useCallback } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import Pagination from '../../components/Pagination'
import { getStories, postStory, editStory, deleteStory } from '../../api/admin'
import StoryTable from '../../components/admin/StoryTable'
import Spinner from '../../components/Spinner'
import {
	Toast,
	DeleteConfirmation,
	Confirmation,
} from '../../utils/toast-helper'
import { useAuth } from '../../context/AuthContext'

const AdminStoriesIndex = () => {
	const [stories, setStories] = useState([])
	const [pagination, setPagination] = useState({})
	const [isLoading, setIsLoading] = useState(false)
	const navigate = useNavigate()
	const { logout } = useAuth()

	const getStroyList = useCallback(
		async (page = 1) => {
			setIsLoading(true)
			try {
				const res = await getStories(page)
				setStories(res.data?.articles)
				setPagination(res.data?.pagination)
			} catch (error) {
				if (error.response.status === 401) {
					// api path unauthorized
					logout()
				} else {
					setStories([])
					setPagination({})
					Toast.fire({ icon: 'error', title: '取得資料發生錯誤' })
				}
			} finally {
				setIsLoading(false)
			}
		},
		[logout]
	)

	const handleSubmitStory = async (data) => {
		try {
			if (data.id === 'create') {
				await postStory(data)
			} else {
				await editStory(data, data.id)
			}
			Toast.fire({ icon: 'success', title: '操作成功' })
			getStroyList()
			navigate('')
		} catch (error) {
			Toast.fire({ icon: 'error', title: '發生錯誤，請重新操作' })
		}
	}

	const handleDeleteStory = async (id) => {
		const { isConfirmed } = await DeleteConfirmation.fire()
		if (isConfirmed) {
			try {
				await deleteStory(id)
				Confirmation.fire({ title: '已刪除文章' })
				getStroyList()
				navigate('')
			} catch (error) {
				Toast.fire({ icon: 'error', title: '發生錯誤，請重新操作' })
			}
		}
	}

	useEffect(() => {
		getStroyList()
	}, [getStroyList])

	return (
		<div className="p-3">
			<Spinner isLoading={isLoading} />
			<h1 className="h3">文章列表</h1>
			<hr />
			<div className="row">
				<div className="col-6">
					<Link
						className="btn btn-primary btn-sm text-white"
						to="create"
						role="button"
					>
						新增文章
					</Link>
					<StoryTable stories={stories} handleDeleteStory={handleDeleteStory} />
					<Pagination pagination={pagination} getDataList={getStroyList} />
				</div>
				<div className="col-6">
					<Outlet context={{ handleSubmitStory, navigate }} />
				</div>
			</div>
		</div>
	)
}

export default AdminStoriesIndex
