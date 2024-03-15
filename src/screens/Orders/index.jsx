import React, { useEffect, useState } from 'react'
import { bell } from '../../assets/'
import InProcessCard from '@components/Cards/InProcessCard/InProcessCard'
import NewOrderCard from '@components/Cards/NewOrderCard/NewOrderCard'
import styles from './orders.module.scss'
import PaginatedItems from '@components/Pagination'
import Items from '@components/Pagination'
import ReadyCard from '../../components/Cards/ReadyCard/ReadyCard'
import CancelOrderCard from '../../components/Cards/CancelOrderCard/CancelOrderCard'
import CompletedOrderCard from '../../components/Cards/CompletedOrderCard/CompletedOrderCard'

const Orders = () => {
  const statusData = [
    { statusName: 'Новые', color: 'rgb(133, 202, 255)' },
    { statusName: 'В процессе', color: 'rgb(253, 248, 118)' },
    { statusName: 'Готово', color: 'rgb(81, 219, 103)' },
    { statusName: 'Отменено', color: 'rgb(235, 239, 242)' },
    { statusName: 'Завершено', color: 'rgb(42, 52, 64)' },
  ]
  const [activeButton, setActiveButton] = useState('На вынос')
  const [activeStatus, setActiveStatus] = useState('Новые')
  const orderDataInCafe = {
    id: 'М-47',
    email: 'Сергей',
    order: [
      {
        item: 'Капучино',
        count: 1,
      },
      {
        item: 'Багровый закат',
        count: 1,
      },
      {
        item: 'Мохито Клубничный',
        count: 1,
      },
      {
        item: 'Печенье',
        count: 1,
      },
      {
        item: 'Печенье',
        count: 1,
      },
      {
        item: 'Печенье',
        count: 1,
      },
      {
        item: 'Печенье',
        count: 1,
      },
    ],
  }
  const orderDataTakeAway = {
    id: 'B-01',
    email: 'user@mail.com',
    order: [
      {
        item: 'Американо',
        count: 1,
      },
      {
        item: 'Медовик',
        count: 1,
      },
      {
        item: 'Чай черный',
        count: 1,
      },
    ],
  }
  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType)
  }
  const handleStatusButtonClick = (buttonName) => {
    setActiveStatus(buttonName)
  }

  const renderCardContent = (data) => {
    switch (activeStatus) {
      case 'Новые':
        return <NewOrderCard data={data} />
      case 'В процессе':
        return <InProcessCard data={data} />
      case 'Готово':
        return <ReadyCard data={data} />
      case 'Отменено':
        return <CancelOrderCard data={data} />
      case 'Завершено':
        return <CompletedOrderCard data={data} />
      default:
        return null
    }
  }
  const MemoizedOrderCard = React.memo(renderCardContent)
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
          {activeButton === 'На вынос' ? (
            <MemoizedOrderCard data={orderDataTakeAway} />
          ) : (
            <MemoizedOrderCard data={orderDataInCafe} />
          )}
        </div>
      </div>
      <PaginatedItems itemsPerPage={5} />
    </div>
  )
}

export default Orders
