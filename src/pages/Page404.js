import { Link } from 'react-router-dom'

const Page404 = () => {
	return (
		<div className="container my-5 text-center">
			<h1 className="mb-4">Oops!</h1>
			<h2>找不到頁面</h2>
			<br />

			<Link className="btn btn-info text-white" role="button" to={'/'}>
				回首頁
			</Link>
		</div>
	)
}

export default Page404
