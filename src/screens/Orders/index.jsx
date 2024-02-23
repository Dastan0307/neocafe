import React, { useState } from 'react'
import { bell } from '../../assets/'
import InProcessCard from '@components/Cards/InProcessCard/InProcessCard'
import NewOrderCard from '@components/Cards/NewOrderCard/NewOrderCard'
import styles from './orders.module.scss'
import PaginatedItems from '@components/Pagination'
import Items from '@components/Pagination'
import ReadyCard from '../../components/Cards/ReadyCard/ReadyCard'

const Orders = () => {
  const [activeButton, setActiveButton] = useState('На вынос')
  const [activeStatus, setActiveStatus] = useState('Новые')
  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType)
  }
  const handleStatusButtonClick = (buttonName) => {
    setActiveStatus(buttonName)
  }
  const statusData = [
    { statusName: 'Новые', color: 'rgb(133, 202, 255)' },
    { statusName: 'В процессе', color: 'rgb(253, 248, 118)' },
    { statusName: 'Готово', color: 'rgb(81, 219, 103)' },
    { statusName: 'Отменено', color: 'rgb(235, 239, 242)' },
    { statusName: 'Завершено', color: 'rgb(42, 52, 64)' },
  ]
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
      <div className={styles.container}>
        <div className={styles.statusbar}>
          {statusData.map((status) => (
            <button
              className={
                activeStatus === status.statusName
                  ? styles.activeStatus
                  : styles.status
              }
              onClick={() => handleStatusButtonClick(status.statusName)}
            >
              <div
                className={styles.circle}
                style={{ background: status.color }}
              ></div>
              {status.statusName}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.cardsWrapper}>
          <ReadyCard />
        </div>
      </div>
      <PaginatedItems itemsPerPage={5} />
    </div>
  )
}

export default Orders
