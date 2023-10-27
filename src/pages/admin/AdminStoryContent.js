import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getStory } from '../../api/admin'
import StoryContent from '../../components/admin/StoryContent'
import { todayUnix } from '../../utils/dayjs-helper'

const AdminStoryContent = () => {
	const [story, setStory] = useState({
		author: '',
		content: '',
		create_at: todayUnix(),
		description: '',
		id: 'create',
		image: '',
		isPublic: false,
		tag: [],
		title: '',
		isEditMode: false,
	})
	const { id } = useParams()
	const getContent = async (id) => {
		const data = await getStory(id)
		setStory({ ...data?.article, isEditMode: false })
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
				tag: [],
				title: '',
				isEditMode: false,
			})
		}
	}, [id])

	return (
		<div>
			<StoryContent story={story} />
		</div>
	)
}

export default AdminStoryContent
