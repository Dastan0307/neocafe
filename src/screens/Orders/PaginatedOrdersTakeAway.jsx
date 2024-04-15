import React, { useState, useEffect } from 'react'
import Cart from '../Cart'
import ReactPaginate from 'react-paginate'

export default function PaginatedOrderCards({
  orderDataTakeAway,
  activeStatus,
  styles,
  handleCancelOrder,
  showAllItems,
  setShowAllItems,
  handleOrderStatus,
  activeButton,
  handleOrderCart,
}) {
  const itemsPerPage = 4
  const [itemOffset, setItemOffset] = useState(0)
  const filteredOrders = orderDataTakeAway.filter(
    (order) => order.status === activeStatus,
  )
  const pageCount = Math.ceil(filteredOrders.length / itemsPerPage)
  const endOffset = itemOffset + itemsPerPage
  const currentOrders = filteredOrders.slice(itemOffset, endOffset)

  const handlePageClick = ({ selected }) => {
    const newOffset = selected * itemsPerPage
    setItemOffset(newOffset)
  }
  useEffect(() => {}, [activeStatus])

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardsWrapper}>
        {activeButton === 'На вынос' && (
          <>
            {currentOrders.map((order) => (
              <div
                className={styles.cardRoot}
                key={order.id}
                onClick={() => handleOrderCart(order)}
              >
                <div>
                  <div className={styles.cardHeader}>
                    <h3>{order.id}</h3>
                    {order.status === 'Новый' && (
                      <div
                        className={styles.close}
                        onClick={() => handleCancelOrder(order.id)}
                      >
                        &times;
                      </div>
                    )}
                  </div>
                  <p>{order.user_name}</p>
                  <ul>
                    {order.items
                      .slice(0, showAllItems ? order.items.length : 2)
                      .map((item, index) => (
                        <li key={index}>
                          {item.quantity}x {item.menu_detail.name}
                        </li>
                      ))}
                  </ul>
                </div>
                {order.items.length > 2 && (
                  <div>
                    {!showAllItems && (
                      <div
                        className={styles.extra}
                        onClick={() => setShowAllItems(true)}
                      >
                        Ещё +{order.items.length - 2}
                      </div>
                    )}
                  </div>
                )}
                <button
                  className={`
              ${
                order.status === 'Готово'
                  ? styles['btn-gotovo']
                  : order.status === 'В процессе'
                    ? styles['btn-inprocess']
                    : order.status === 'Новый'
                      ? styles['btn-new']
                      : order.status === 'Отменено'
                        ? styles['btn-cancel']
                        : order.status === 'Завершено'
                          ? styles['btn-completed']
                          : ''
              }`}
                  onClick={() => handleOrderStatus(order.id, order.status)}
                >
                  {order.status === 'Готово'
                    ? 'Заказ готов'
                    : order.status === 'В процессе'
                      ? 'Завершить заказ'
                      : order.status === 'Новый'
                        ? 'Принять заказ'
                        : order.status === 'Готово'
                          ? 'Заказ готов'
                          : order.status === 'Отменено'
                            ? 'Заказ отменен'
                            : order.status === 'Завершено'
                              ? 'Заказ завершен'
                              : ''}
                </button>
              </div>
            ))}
          </>
        )}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName={styles.pagination}
        activeClassName={styles.selected}
        nextClassName={styles.next}
        previousClassName={styles.previous}
      />
    </div>
  )
}
