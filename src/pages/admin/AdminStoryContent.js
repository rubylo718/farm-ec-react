import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getStory } from '../../api/admin'
import StoryContent from '../../components/admin/StoryContent'
import Spinner from '../../components/Spinner'
import { todayUnix } from '../../utils/dayjs-helper'

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
		tag: [],
		title: '',
		isEditMode: false,
	})
	const { id } = useParams()
	const getContent = async (id) => {
		setIsLoading(true)
		const data = await getStory(id)
		setStory({ ...data?.article, isEditMode: false })
		setIsLoading(false)
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
