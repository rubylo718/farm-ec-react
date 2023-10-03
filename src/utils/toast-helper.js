import Swal from 'sweetalert2'

export const Toast = Swal.mixin({
	position: 'top',
	toast: true,
	width: '14em',
	timer: 1500,
	showConfirmButton: false,
})
