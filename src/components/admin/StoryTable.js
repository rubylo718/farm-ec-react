import { Link } from 'react-router-dom'
import { unixToDateString } from '../../utils/dayjs-helper'

const StoryTable = ({ stories, handleDeleteStory }) => {
	return (
		<table className="table">
			<thead>
				<tr>
					<th scope="col">文章標題</th>
					<th scope="col">建立日期</th>
					<th scope="col">狀態</th>
					<th scope="col">動作</th>
				</tr>
			</thead>
			<tbody>
				{stories?.map((story) => {
					return (
						<tr key={story.id}>
							<td>{story.title}</td>
							<td className="text-nowrap">
								{unixToDateString(story.create_at)}
							</td>
							<td className="text-nowrap">
								{story.isPublic ? '公開' : '未公開'}
							</td>
							<td className="text-nowrap">
								<Link
									className="btn btn-primary btn-sm text-white me-1"
									to={story.id}
									role="button"
								>
									查看
								</Link>
								<button
									type="button"
									className="btn btn-outline-danger btn-sm"
									onClick={() => handleDeleteStory(story.id)}
								>
									刪除
								</button>
							</td>
						</tr>
					)
				})}
			</tbody>
		</table>
	)
}

export default StoryTable
