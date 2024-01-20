import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getStory } from '../../api/admin'
import StoryContent from '../../components/admin/StoryContent'
import Spinner from '../../components/Spinner'
import { todayUnix } from '../../utils/dayjs-helper'
import { Toast } from '../../utils/toast-helper'

const AdminStoryContent = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [story, setStory] = useState({
		author: '',
		content: '',
		create_at: todayUnix(),
		description: '',
		id: 'create',
		image: '',
		isPublic: false,
		tag: [""],
		title: '',
		isEditMode: false,
	})
	const { id } = useParams()
	const getContent = async (id) => {
		setIsLoading(true)
		try {
			const res = await getStory(id)
			setStory({ ...res.data?.article, isEditMode: false })
		} catch (error) {
			Toast.fire({ icon: 'error', title: '取得資料發生錯誤' })
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		if (id !== 'create') {
			getContent(id)
		} else {
			setStory({
				author: '',
				content: '',
				create_at: todayUnix(),
				description: '',
				id: 'create',
				image: '',
				isPublic: false,
				tag: [""],
				title: '',
				isEditMode: true,
			})
		}
	}, [id])

	return (
		<div>
			<Spinner isLoading={isLoading} />
			<StoryContent story={story} />
		</div>
	)
}

export default AdminStoryContent
