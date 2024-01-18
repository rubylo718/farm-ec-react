import { useForm, useWatch } from 'react-hook-form'
import { useOutletContext } from 'react-router-dom'
import { dateStringToUnix, unixToDateString } from '../../utils/dayjs-helper'
import Input from '../form/Input'
import Textarea from '../form/Textarea'
import Checkbox from '../form/Checkbox'

const StoryContent = ({ story }) => {
	const { handleSubmitStory, navigate } = useOutletContext()
	const {
		register,
		handleSubmit,
		reset,
		control,
		setValue,
		formState: { isDirty, errors },
	} = useForm({
		mode: 'onSubmit',
		values: {
			...story,
			create_at: unixToDateString(story.create_at),
			tag: Array.isArray(story.tag) ? story.tag[0] : story.tag,
		},
	})

	const watchIsEditMode = useWatch({
		control,
		name: 'isEditMode',
		defaultValue: false,
	})
	const watchImgUrl = useWatch({ control, name: 'image', defaultValue: '' })

	const onSubmit = async (data) => {
		if (!data.isEditMode) {
			setValue('isEditMode', true)
			return
		}
		if (!isDirty) {
			navigate('')
			return
		}
		await handleSubmitStory({
			...data,
			tag: [data.tag.trim()],
			create_at: dateStringToUnix(data.create_at),
			isEditMode: false,
		})
	}

	const handleCancel = () => {
		reset()
		navigate('')
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="row">
				<div className="col-md-12 mb-2">
					<Input
						register={register}
						errors={errors}
						id="title"
						type="text"
						labelText="標題"
						rules={{ required: '請輸入標題' }}
						readOnly={!watchIsEditMode}
					/>
				</div>
				<div className="col-md-6 mb-2">
					<Input
						register={register}
						errors={errors}
						id="create_at"
						type="date"
						labelText="建立日期"
						rules={{}}
						readOnly={!watchIsEditMode}
					/>
				</div>
				<div className="col-md-6 mb-2">
					<Input
						register={register}
						errors={errors}
						id="author"
						type="text"
						labelText="作者"
						rules={{ required: '請輸入作者' }}
						readOnly={!watchIsEditMode}
					/>
				</div>
				<div className="col-md-12 mb-2">
					<Textarea
						register={register}
						errors={errors}
						id="image"
						rows="2"
						labelText="圖片網址"
						readOnly={!watchIsEditMode}
					/>
					{watchImgUrl && (
						<>
							<p className="my-1">圖片預覽</p>
							<img
								src={watchImgUrl}
								className="card-img-top rounded-0 admin-story-img object-fit-cover"
								alt="圖片預覽處"
							/>
						</>
					)}
				</div>
				<div className="col-md-12 mb-2">
					<Input
						register={register}
						errors={errors}
						id="tag"
						type="text"
						labelText="產品搜尋關鍵字/詞"
						rules={{
							required: '請輸入關鍵字/詞',
							validate: (str) => str.trim() !== '' || '請勿輸入空字串',
						}}
						readOnly={!watchIsEditMode}
					/>
				</div>
				<div className="col-md-12 mb-2">
					<Textarea
						register={register}
						errors={errors}
						id="description"
						rows="1"
						labelText="簡短描述"
						readOnly={!watchIsEditMode}
					/>
				</div>
				<div className="col-md-12 mb-2">
					<Textarea
						register={register}
						errors={errors}
						id="content"
						rows="10"
						labelText="內容（按Enter分段）"
						rules={{ required: '請輸入內容' }}
						readOnly={!watchIsEditMode}
					/>
				</div>
				<div className="col-md-8 mb-2 form-group">
					<Checkbox
						register={register}
						errors={errors}
						id="isPublic"
						labelText="公開"
						disabled={!watchIsEditMode}
					/>
				</div>
				<div className="col-md-4 text-end">
					<button
						type="button"
						className="btn btn-outline-secondary btn-sm me-2"
						onClick={handleCancel}
					>
						取消
					</button>
					{watchIsEditMode ? (
						<button
							key="storySubmit"
							type="submit"
							className="btn btn-primary btn-sm text-white"
						>
							儲存
						</button>
					) : (
						<button
							key="storyChangeMode"
							type="submit"
							className="btn btn-warning btn-sm"
						>
							編輯
						</button>
					)}
				</div>
			</div>
		</form>
	)
}

export default StoryContent
