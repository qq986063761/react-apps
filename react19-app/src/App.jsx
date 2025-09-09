import { BrowserRouter as Router, useRoutes } from 'react-router-dom'
import './App.css'
import Sidebar from './components/Sidebar'
import ContentArea from './components/ContentArea'
import routes from './routes.jsx'

// 路由组件
function AppRoutes() {
  const element = useRoutes(routes)
  return element
}

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <ContentArea>
          <AppRoutes />
        </ContentArea>
      </div>
    </Router>
  )
}

export default App