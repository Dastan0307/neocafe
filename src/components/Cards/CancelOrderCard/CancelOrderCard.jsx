import React, { useState } from 'react'
import styles from './cancelordercard.module.scss'
const CancelOrderCard = ({ data }) => {

  const orderData = data.data
  const [showAllItems, setShowAllItems] = useState(false)

  const displayedItems = showAllItems
    ? orderData.order
    : orderData.order.slice(0, 3)
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
      <button className={styles.btn}>Заказ отменен</button>
    </div>
  )
}

export default CancelOrderCard
