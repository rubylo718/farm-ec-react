import Swal from 'sweetalert2'

export const Toast = Swal.mixin({
	position: 'top',
	toast: true,
	width: '16em',
	timer: 1500,
	showConfirmButton: false,
})

export const DeleteConfirmation = Swal.mixin({
	title: '確認刪除此筆資料？',
  text: "此動作無法回覆",
  icon: 'warning',
	customClass: {
		confirmButton: 'btn btn-danger me-1',
		cancelButton: 'btn btn-secondary ms-1',
	},
	buttonsStyling: false,
	showCancelButton: true,
	confirmButtonText: '是，刪除',
  cancelButtonText: '否，取消',
})

export const Confirmation = Swal.mixin({
	icon: 'success',
	customClass: {
		confirmButton: 'btn btn-primary'
	},
	buttonsStyling: false
})