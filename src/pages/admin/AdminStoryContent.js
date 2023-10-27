import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getStory } from '../../api/admin'
import StoryContent from '../../components/admin/StoryContent'

const AdminStoryContent = () => {
	const [story, setStory] = useState({})
	const { id } = useParams()
	const getContent = async (id) => {
		const data = await getStory(id)
		setStory({ ...data?.article, isEditMode: false })
	}
	useEffect(() => {
		getContent(id)
	}, [id])
	return (
		<div>
			<StoryContent story={story} />
		</div>
	)
}

export default AdminStoryContent
