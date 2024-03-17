import { useState } from 'react'
import styles from './menu.module.scss'

const MenuTabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="tabs">
      <div className="tab-buttons">
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
