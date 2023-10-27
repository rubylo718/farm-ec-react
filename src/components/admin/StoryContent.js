import { useEffect, useState } from 'react'
import {
	dateStringToUnix,
	todayUnix,
	unixToDateString,
} from '../../utils/dayjs-helper'

const StoryContent = ({ story }) => {
	const [data, setData] = useState({
		author: '',
		content: '',
		create_at: todayUnix(),
		description: '',
		id: '',
		image: '',
		isPublic: false,
		tag: [],
		title: '',
		isEditMode: false,
	})

	const handleChange = (e) => {
		const { name, value } = e.target
		if (name === 'isPublic') {
			setData({ ...data, [name]: +e.target.checked })
		} else if (name === 'create_date_string') {
			setData({ ...data, create_at: dateStringToUnix(value) })
		} else {
			setData({ ...data, [name]: value })
		}
	}

	useEffect(() => {
		setData({ ...story, tag: story?.tag })
	}, [story])

	return (
		<div>
			<div className="row">
				<div className="col-md-12 mb-2">
					<label className="w-100" htmlFor="title">
						標題
					</label>
					<input
						type="text"
						id="title"
						name="title"
						className="form-control mt-1"
						onChange={handleChange}
						value={data.title}
					/>
				</div>
				<div className="col-md-6 mb-2">
					<label className="w-100" htmlFor="create_date_string">
						建立日期
					</label>
					<input
						type="date"
						id="create_date_string"
						name="create_date_string"
						className="form-control mt-1"
						onChange={handleChange}
						value={unixToDateString(data.create_at)}
					/>
				</div>
				<div className="col-md-6 mb-2">
					<label className="w-100" htmlFor="author">
						作者
					</label>
					<input
						type="text"
						id="author"
						name="author"
						className="form-control mt-1"
						onChange={handleChange}
						value={data.author}
					/>
				</div>
				<div className="col-md-12 mb-2">
					<label className="w-100" htmlFor="image">
						圖片網址
					</label>
					<textarea
						id="image"
						name="image"
						className="form-control mt-1"
						value={data.image}
						onChange={handleChange}
						rows={1}
					/>
				</div>
				<div className="col-md-12 mb-2">
					<label>圖片預覽</label>
					{data.image && (
						<img
							src={data.image}
							className="card-img-top rounded-0"
							alt="圖片預覽處"
							style={{ height: '150px', objectFit: 'cover' }}
						/>
					)}
				</div>
				<div className="col-md-12 mb-2">
					<label className="w-100" htmlFor="description">
						簡短描述
					</label>
					<textarea
						id="description"
						name="description"
						className="form-control mt-1"
						value={data.description}
						onChange={handleChange}
						rows={1}
					/>
				</div>
				<div className="col-md-12 mb-2">
					<label className="w-100" htmlFor="content">
						內容
					</label>
					<textarea
						id="content"
						name="content"
						className="form-control mt-1"
						value={data.content}
						onChange={handleChange}
						rows={10}
					/>
				</div>
			</div>
			<input
				className="form-check-input me-2"
				type="checkbox"
				id="isPublic"
				name="isPublic"
				onChange={handleChange}
				checked={Boolean(data.isPublic)}
			/>
			<label className="form-check-label" htmlFor="isPublic">
				是否公開
			</label>
		</div>
	)
}

export default StoryContent
