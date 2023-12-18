import Swal from 'sweetalert2'

export const Toast = Swal.mixin({
	position: 'top',
	toast: true,
	timer: 1500,
	showConfirmButton: false,
})

export const DeleteConfirmation = Swal.mixin({
	title: '確認刪除此筆資料？',
	text: '此動作無法回覆',
	icon: 'warning',
	customClass: {
		confirmButton: 'btn btn-danger me-1',
		cancelButton: 'btn btn-light ms-1',
		title: 'fs-5',
	},
	buttonsStyling: false,
	showCancelButton: true,
	confirmButtonText: '是，刪除',
	cancelButtonText: '否，取消',
})

export const Confirmation = Swal.mixin({
	icon: 'success',
	customClass: {
		confirmButton: 'btn btn-primary text-white',
	},
	buttonsStyling: false,
})

export const InputConfirmation = Swal.mixin({
	icon: 'question',
	customClass: {
		confirmButton: 'btn btn-primary text-white me-1',
		cancelButton: 'btn btn-light ms-1',
		title: 'fs-4',
	},
	buttonsStyling: false,
	showCancelButton: true,
	confirmButtonText: '確認',
	cancelButtonText: '取消',
})
