import React, { useState } from 'react'
import styles from './newordercard.module.scss'
const NewOrderCard = ({ data }) => {
  const orderData = data.data

  const [showAllItems, setShowAllItems] = useState(false)

  const displayedItems = showAllItems
    ? orderData.order
    : orderData.order.slice(0, 2)
  //   const firstTwoItems = orderData.order.slice(0, 3);
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h3>{orderData.id}</h3>
        <div className={styles.close}>&times;</div>
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
      <button className={styles.btn}>Принять</button>
    </div>
  )
}

export default NewOrderCard
