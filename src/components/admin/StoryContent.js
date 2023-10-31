import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { dateStringToUnix, unixToDateString } from '../../utils/dayjs-helper'

const StoryContent = ({ story }) => {
	const [data, setData] = useState({ ...story, tag: story.tag })
	const { handleSubmit, navigate } = useOutletContext()

	const handleChange = (e) => {
		const { name, value } = e.target
		if (name === 'isPublic') {
			setData({ ...data, [name]: e.target.checked })
		} else if (name === 'create_date_string') {
			setData({ ...data, create_at: dateStringToUnix(value) })
		} else if (name === 'tag') {
			setData({ ...data, tag: [value.trim()] })
		} else {
			setData({ ...data, [name]: value })
		}
	}

	useEffect(() => {
		setData({ ...story, tag: story?.tag })
	}, [story])

	return (
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
					readOnly={!data.isEditMode}
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
					readOnly={!data.isEditMode}
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
					readOnly={!data.isEditMode}
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
					readOnly={!data.isEditMode}
				/>
				{data.image && (
					<>
						<p className="my-1">圖片預覽</p>
						<img
							src={data.image}
							className="card-img-top rounded-0"
							alt="圖片預覽處"
							style={{ height: '150px', objectFit: 'cover' }}
						/>
					</>
				)}
			</div>
			<div className="col-md-12 mb-2">
				<label className="w-100" htmlFor="tag">
					標籤
				</label>
				<input
					type="text"
					id="tag"
					name="tag"
					className="form-control mt-1"
					onChange={handleChange}
					value={data?.tag || ''}
					readOnly={!data.isEditMode}
				/>
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
					readOnly={!data.isEditMode}
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
					readOnly={!data.isEditMode}
				/>
			</div>
			<div className="col-md-8 mb-2 form-check">
				<input
					className="form-check-input me-2"
					type="checkbox"
					id="isPublic"
					name="isPublic"
					onChange={handleChange}
					checked={data.isPublic}
					disabled={!data.isEditMode}
				/>
				<label className="form-check-label" htmlFor="isPublic">
					公開
				</label>
			</div>
			<div className="col-md-4 text-end">
				<button
					className="btn btn-outline-secondary btn-sm me-2"
					onClick={() => navigate('')}
				>
					取消
				</button>
				{data.isEditMode ? (
					<button
						className="btn btn-primary btn-sm"
						onClick={() => handleSubmit({ ...data, isEditMode: false })}
					>
						儲存
					</button>
				) : (
					<button
						className="btn btn-warning btn-sm"
						onClick={() => setData({ ...data, isEditMode: true })}
					>
						編輯
					</button>
				)}
			</div>
		</div>
	)
}

export default StoryContent
