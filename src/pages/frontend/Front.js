import { Outlet } from 'react-router-dom'
import Footer from '../../components/frontend/Footer'
import Navbar from '../../components/frontend/Navbar'

const FrontLayout = () => {
	return (
		<>
			<Navbar />
			<Outlet />
			<Footer />
		</>
	)
}

export default FrontLayout
