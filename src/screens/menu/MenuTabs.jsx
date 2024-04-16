import { useEffect, useState } from 'react'
import styles from './menu.module.scss'

const MenuTabs = ({ tabs, setIsActive }) => {
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    setIsActive(activeTab)
  }, [activeTab, ])

  return (
    <div className="tabs">
      <div className="tab-buttons" style={{ margin: '24px 0 0 32px' }}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={index === activeTab ? styles.active : styles.tabs_btn}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content">{tabs[activeTab].content}</div>
    </div>
  )
}

export default MenuTabs
