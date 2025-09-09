import { Link, useLocation } from 'react-router-dom'
import { generateMenuConfig } from '../utils/routeUtils'
import routes from '../routes.jsx'
import './Sidebar.css'

function Sidebar() {
  const location = useLocation()
  
  // 从路由配置动态生成菜单
  const menuItems = generateMenuConfig(routes)
  
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>React 组件学习</h2>
        <p>从基础组件到高级应用</p>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <Link
            key={item.id}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <div className="nav-item-content">
              <span className="nav-item-label">{item.label}</span>
              <span className="nav-item-description">{item.description}</span>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar
