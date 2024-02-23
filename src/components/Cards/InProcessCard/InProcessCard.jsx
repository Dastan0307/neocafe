import React, {useState} from 'react'
import styles from './inprocesscard.module.scss'
const InProcessCard = () => {
    const orderData = {
        id: 'М-47',
        email: 'user@mail.com',
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
      const [showAllItems, setShowAllItems] = useState(false)
    
      const displayedItems = showAllItems
        ? orderData.order
        : orderData.order.slice(0, 2)
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h3>{orderData.id}</h3>
      </div>
      <p>{orderData.email}</p>
      <ul>
        {displayedItems.map((item, index) => (
          <li key={index}>
            {item.count}x {item.item}
          </li>
        ))}
      </ul>
      {orderData.order.length > 2 && (
        <div>
          {showAllItems ? null : (
            <div className={styles.extra} onClick={() => setShowAllItems(true)}>
              Ещё +{orderData.order.length - 2}
            </div>
          )}
        </div>
      )}
      <button className={styles.btn}>Завершить заказ</button>
    </div>
  )
}

export default InProcessCard