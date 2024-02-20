import React, { useState } from 'react'
import { bell } from '../../assets/'
import styles from './orders.module.scss'
const Orders = () => {
  const [activeButton, setActiveButton] = useState('На вынос')

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType)
  }
  return (
    <div>
      <header className={styles.header}>
        <h2>Заказы</h2>
        <div className={styles.btnWrapper}>
          <button
            className={activeButton === 'На вынос' ? styles.active : ''}
            onClick={() => handleButtonClick('На вынос')}
          >
            На вынос
          </button>
          <button
            className={activeButton === 'В заведении' ? styles.active : ''}
            onClick={() => handleButtonClick('В заведении')}
          >
            В заведении
          </button>
        </div>
        <div>
          <img src={bell} alt="bell" />
        </div>
      </header>
    </div>
  )
}

export default Orders
