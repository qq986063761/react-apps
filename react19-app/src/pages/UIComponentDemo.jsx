import { useState } from 'react'

// 子组件 - 按钮组件
function CustomButton({ 
  text, 
  variant = 'primary', 
  disabled = false, 
  onClick 
}) {
  const buttonClass = `custom-button ${variant} ${disabled ? 'disabled' : ''}`
  
  return (
    <button 
      className={buttonClass}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

// 子组件 - 卡片组件
function Card({ 
  title, 
  content, 
  onCardClick,
  onEdit,
  onDelete 
}) {
  return (
    <div className="card" onClick={onCardClick}>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-text">{content}</p>
        <div className="card-actions">
          <button onClick={(e) => {
            e.stopPropagation() // 阻止事件冒泡
            onEdit?.()
          }}>编辑</button>
          <button onClick={(e) => {
            e.stopPropagation() // 阻止事件冒泡
            onDelete?.()
          }}>删除</button>
        </div>
      </div>
    </div>
  )
}

function UIComponentDemo() {
  const [activeDemo, setActiveDemo] = useState('button')
  
  // 按钮组件相关状态
  const [buttonClicks, setButtonClicks] = useState(0)
  const [buttonDisabled, setButtonDisabled] = useState(false)
  
  // 卡片组件相关状态
  const [selectedCard, setSelectedCard] = useState(null)
  const [cards] = useState([
    { id: 1, title: 'React 学习', content: '学习React基础知识和Hooks' },
    { id: 2, title: 'Vue 学习', content: '学习Vue 3组合式API' },
    { id: 3, title: 'JavaScript 进阶', content: '深入学习JavaScript高级特性' }
  ])
  
  // 按钮事件处理
  const handleButtonClick = () => {
    setButtonClicks(prev => prev + 1)
  }
  
  // 卡片事件处理
  const handleCardClick = (card) => {
    setSelectedCard(card)
  }
  
  const handleCardEdit = (card) => {
    alert(`编辑卡片: ${card.title}`)
  }
  
  const handleCardDelete = (card) => {
    alert(`删除卡片: ${card.title}`)
  }

  const demos = [
    { id: 'button', label: '按钮组件' },
    { id: 'card', label: '卡片组件' },
    { id: 'combined', label: '组合使用' }
  ]

  const renderDemo = () => {
    switch (activeDemo) {
      case 'button':
        return (
          <div className="demo-section">
            <h3>按钮组件 - Props传递与事件处理</h3>
            <div className="demo-item">
              <h4>不同样式的按钮:</h4>
              <div className="button-showcase">
                <CustomButton text="主要按钮" variant="primary" onClick={handleButtonClick} />
                <CustomButton text="次要按钮" variant="secondary" onClick={handleButtonClick} />
                <CustomButton text="危险按钮" variant="danger" onClick={handleButtonClick} />
                <CustomButton 
                  text="禁用按钮" 
                  disabled={buttonDisabled} 
                  onClick={handleButtonClick} 
                />
              </div>
              <div className="demo-controls">
                <button onClick={() => setButtonDisabled(!buttonDisabled)}>
                  {buttonDisabled ? '启用' : '禁用'}按钮
                </button>
                <p>按钮点击次数: {buttonClicks}</p>
              </div>
            </div>
          </div>
        )

      case 'card':
        return (
          <div className="demo-section">
            <h3>卡片组件 - 复杂Props与事件冒泡</h3>
            <div className="demo-item">
              <div className="card-grid">
                {cards.map(card => (
                  <Card
                    key={card.id}
                    title={card.title}
                    content={card.content}
                    onCardClick={() => handleCardClick(card)}
                    onEdit={() => handleCardEdit(card)}
                    onDelete={() => handleCardDelete(card)}
                  />
                ))}
              </div>
              {selectedCard && (
                <div className="selected-info">
                  <h4>选中的卡片:</h4>
                  <p>标题: {selectedCard.title}</p>
                  <p>内容: {selectedCard.content}</p>
                </div>
              )}
            </div>
          </div>
        )

      case 'combined':
        return (
          <div className="demo-section">
            <h3>组合使用 - 多个组件协作</h3>
            <div className="demo-item">
              <h4>按钮和卡片组合演示:</h4>
              <div className="combined-demo">
                <CustomButton
                  text="重置卡片选择"
                  variant="primary"
                  onClick={() => setSelectedCard(null)}
                />
                <CustomButton
                  text="增加点击次数"
                  variant="secondary"
                  onClick={handleButtonClick}
                />
              </div>
              <div className="card-grid">
                {cards.map(card => (
                  <Card
                    key={card.id}
                    title={card.title}
                    content={card.content}
                    onCardClick={() => handleCardClick(card)}
                    onEdit={() => handleCardEdit(card)}
                    onDelete={() => handleCardDelete(card)}
                  />
                ))}
              </div>
              <div className="status-info">
                <p>按钮点击次数: {buttonClicks}</p>
                {selectedCard && <p>当前选中: {selectedCard.title}</p>}
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

export default UIComponentDemo
