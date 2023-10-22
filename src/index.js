import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { HashRouter } from 'react-router-dom'
import ScrollToTop from './utils/scrollToTop'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<HashRouter>
			<ScrollToTop />
			<App />
		</HashRouter>
	</React.StrictMode>
)
