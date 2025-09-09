import { useState, useEffect, useMemo, useCallback, useRef, createContext, useContext, useReducer } from 'react'

/**
 * useReducer 示例 - 复杂状态管理
 * useReducer 是 useState 的替代方案，适用于状态逻辑复杂且包含多个子值的情况
 * 它接受一个 reducer 函数和初始状态，返回当前状态和 dispatch 方法
 * 优势：状态更新逻辑集中管理，便于测试和调试
 */
const counterReducer = (state, action) => {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 }
    case 'decrement': return { count: state.count - 1 }
    case 'reset': return { count: 0 }
    default: return state
  }
}

/**
 * 自定义 Hook 示例 - 逻辑复用
 * 自定义 Hook 是一个以 "use" 开头的函数，可以调用其他 Hook
 * 作用：将组件逻辑提取到可重用的函数中，实现逻辑复用
 * 优势：减少代码重复，提高代码可维护性
 */
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue)
  const increment = useCallback(() => setCount(prev => prev + 1), [])
  const decrement = useCallback(() => setCount(prev => prev - 1), [])
  const reset = useCallback(() => setCount(initialValue), [initialValue])
  return { count, increment, decrement, reset }
}

function ReactAPIDemo() {
  const [activeDemo, setActiveDemo] = useState('useState')
  
  /**
   * useState - 状态管理
   * 作用：在函数组件中添加状态变量
   * 返回：当前状态值和更新状态的函数
   * 特点：每次状态更新都会触发组件重新渲染
   */
  const [count, setCount] = useState(0)
  
  /**
   * useEffect - 副作用处理
   * 作用：处理副作用操作（数据获取、订阅、手动DOM操作等）
   * 参数：回调函数和依赖数组
   * 特点：在组件渲染后执行，可以模拟类组件的生命周期方法
   */
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  
  /**
   * useMemo - 性能优化
   * 作用：缓存计算结果，避免不必要的重复计算
   * 参数：计算函数和依赖数组
   * 特点：只有当依赖项改变时才重新计算，提高性能
   */
  const [items, setItems] = useState(['苹果', '香蕉', '橙子'])
  const [filter, setFilter] = useState('')
  
  /**
   * useCallback - 函数缓存
   * 作用：缓存函数引用，避免子组件不必要的重新渲染
   * 参数：回调函数和依赖数组
   * 特点：只有当依赖项改变时才返回新的函数引用
   */
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  
  /**
   * useRef - 引用管理
   * 作用：创建可变的引用对象，不会触发重新渲染
   * 用途：访问DOM元素、存储可变值、保存前一次的值
   * 特点：返回的对象在组件的整个生命周期内保持不变
   */
  const inputRef = useRef(null)
  
  /**
   * useReducer - 复杂状态管理
   * 作用：管理复杂的状态逻辑，类似于Redux的reducer
   * 参数：reducer函数和初始状态
   * 返回：当前状态和dispatch函数
   */
  const [state, dispatch] = useReducer(counterReducer, { count: 0 })

  /**
   * useEffect 副作用处理示例
   * 监听窗口大小变化，添加和清理事件监听器
   * 空依赖数组 [] 表示只在组件挂载时执行一次
   * 返回清理函数，在组件卸载时执行
   */
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  /**
   * useMemo 性能优化示例
   * 缓存过滤结果，只有当 items 或 filter 改变时才重新计算
   * 避免每次渲染都执行过滤操作，提高性能
   */
  const filteredItems = useMemo(() => {
    return items.filter(item => item.toLowerCase().includes(filter.toLowerCase()))
  }, [items, filter])

  /**
   * useCallback 函数缓存示例
   * 缓存 addTodo 函数，只有当 newTodo 改变时才返回新函数
   * 避免子组件因为函数引用变化而重新渲染
   */
  const addTodo = useCallback(() => {
    if (newTodo.trim()) {
      setTodos(prev => [...prev, { id: Date.now(), text: newTodo }])
      setNewTodo('')
    }
  }, [newTodo])

  const demos = [
    { id: 'useState', label: 'useState' },
    { id: 'useEffect', label: 'useEffect' },
    { id: 'useMemo', label: 'useMemo' },
    { id: 'useCallback', label: 'useCallback' },
    { id: 'useRef', label: 'useRef' },
    { id: 'useReducer', label: 'useReducer' }
  ]

  const renderDemo = () => {
    switch (activeDemo) {
      case 'useState':
        return (
          <div className="demo-section">
            <h3>useState - 状态管理</h3>
            <div className="demo-description">
              <p><strong>功能：</strong>在函数组件中添加状态变量，管理组件的内部状态</p>
              <p><strong>特点：</strong>每次状态更新都会触发组件重新渲染</p>
              <p><strong>使用场景：</strong>表单输入、计数器、开关状态等简单状态管理</p>
            </div>
            <div className="demo-item">
              <p>当前计数: {count}</p>
              <div className="button-group">
                <button onClick={() => setCount(count + 1)}>增加</button>
                <button onClick={() => setCount(count - 1)}>减少</button>
                <button onClick={() => setCount(0)}>重置</button>
              </div>
            </div>
          </div>
        )

      case 'useEffect':
        return (
          <div className="demo-section">
            <h3>useEffect - 副作用处理</h3>
            <div className="demo-description">
              <p><strong>功能：</strong>处理副作用操作，如数据获取、订阅、手动DOM操作等</p>
              <p><strong>特点：</strong>在组件渲染后执行，可以模拟类组件的生命周期方法</p>
              <p><strong>使用场景：</strong>API调用、事件监听、定时器、清理资源等</p>
            </div>
            <div className="demo-item">
              <p>当前窗口宽度: {windowWidth}px</p>
              <p>调整浏览器窗口大小查看变化</p>
            </div>
          </div>
        )

      case 'useMemo':
        return (
          <div className="demo-section">
            <h3>useMemo - 性能优化</h3>
            <div className="demo-description">
              <p><strong>功能：</strong>缓存计算结果，避免不必要的重复计算</p>
              <p><strong>特点：</strong>只有当依赖项改变时才重新计算，提高性能</p>
              <p><strong>使用场景：</strong>复杂计算、过滤列表、排序等耗时操作</p>
            </div>
            <div className="demo-item">
              <input
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="过滤项目..."
              />
              <ul>
                {filteredItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p>过滤结果: {filteredItems.length} 项</p>
            </div>
          </div>
        )

      case 'useCallback':
        return (
          <div className="demo-section">
            <h3>useCallback - 函数缓存</h3>
            <div className="demo-description">
              <p><strong>功能：</strong>缓存函数引用，避免子组件不必要的重新渲染</p>
              <p><strong>特点：</strong>只有当依赖项改变时才返回新的函数引用</p>
              <p><strong>使用场景：</strong>传递给子组件的回调函数、事件处理函数等</p>
            </div>
            <div className="demo-item">
              <div className="todo-input">
                <input
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  placeholder="输入待办事项..."
                  onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                />
                <button onClick={addTodo}>添加</button>
              </div>
              <ul>
                {todos.map(todo => (
                  <li key={todo.id}>{todo.text}</li>
                ))}
              </ul>
            </div>
          </div>
        )

      case 'useRef':
        return (
          <div className="demo-section">
            <h3>useRef - 引用管理</h3>
            <div className="demo-description">
              <p><strong>功能：</strong>创建可变的引用对象，不会触发重新渲染</p>
              <p><strong>特点：</strong>返回的对象在组件的整个生命周期内保持不变</p>
              <p><strong>使用场景：</strong>访问DOM元素、存储可变值、保存前一次的值</p>
            </div>
            <div className="demo-item">
              <input ref={inputRef} type="text" placeholder="点击按钮聚焦到这个输入框" />
              <button onClick={() => inputRef.current?.focus()}>聚焦输入框</button>
            </div>
          </div>
        )

      case 'useReducer':
        return (
          <div className="demo-section">
            <h3>useReducer - 复杂状态管理</h3>
            <div className="demo-description">
              <p><strong>功能：</strong>管理复杂的状态逻辑，类似于Redux的reducer</p>
              <p><strong>特点：</strong>状态更新逻辑集中管理，便于测试和调试</p>
              <p><strong>使用场景：</strong>复杂状态、多个相关状态、状态逻辑复杂的情况</p>
            </div>
            <div className="demo-item">
              <p>当前计数: {state.count}</p>
              <div className="button-group">
                <button onClick={() => dispatch({ type: 'increment' })}>增加</button>
                <button onClick={() => dispatch({ type: 'decrement' })}>减少</button>
                <button onClick={() => dispatch({ type: 'reset' })}>重置</button>
              </div>
            </div>
          </div>
        )

      default:
        return <div>请选择一个演示</div>
    }
  }

  return (
    <div className="demo-container">
      <div className="demo-tabs">
        {demos.map(demo => (
          <button
            key={demo.id}
            className={`demo-tab ${activeDemo === demo.id ? 'active' : ''}`}
            onClick={() => setActiveDemo(demo.id)}
          >
            {demo.label}
          </button>
        ))}
      </div>
      
      {renderDemo()}
    </div>
  )
}

export default ReactAPIDemo
