import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bell } from '../../assets/'
import ReactPaginate from 'react-paginate'
// import PaginatedItems from '@components/Pagination'
import Items from '@components/Pagination'
import { getOrders, changeOrderInfo, getOrderInfo } from '../../api/api'
import { getProfileUser } from '@store/slices/authSlice'
import { setOrders, setTakeAwayOrders } from '../../store/slices/ordersSlice'
import { setActiveStatus } from '../../store/slices/statusSlice'
import { openModal } from '@store/slices/modalSlice.js'
import styles from './orders.module.scss'


const Orders = () => {
  const dispatch = useDispatch()
  const [showAllItems, setShowAllItems] = useState(false)

  const statusData = [
    {
      statusName: 'Новый',
      color: 'rgb(133, 202, 255)',
      activeBtn: 'Принять',
      btnStyle: '',
    },
    {
      statusName: 'В процессе',
      color: 'rgb(253, 248, 118)',
      activeBtn: '',
      btnStyle: '',
    },
    {
      statusName: 'Готово',
      color: 'rgb(81, 219, 103)',
      activeBtn: 'Заказ готов',
      btnStyle: '',
    },
    {
      statusName: 'Отменено',
      color: 'rgb(235, 239, 242)',
      activeBtn: 'Отменено',
      btnStyle: '',
    },
    {
      statusName: 'Завершено',
      color: 'rgb(42, 52, 64)',
      activeBtn: 'Завершено',
      btnStyle: '',
    },
  ]
  const [activeButton, setActiveButton] = useState('На вынос')
  const allOrdersData = useSelector((state) => state.orders.orders)
  const activeStatus = useSelector((state) => state.status.activeStatus)
  const orderDataTakeAway = useSelector((state) => state.orders.takeawayOrders)
  const orderData = useSelector((state) => state.orders.cafeOrders)
  // const orderDataTakeAway = useSelector((state) => state.orders.takeawayOrders)

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType)
  }

  const handleStatusButtonClick = (buttonName) => {
    dispatch(setActiveStatus(buttonName))
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getOrders()
        dispatch(setOrders(res.data))
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    dispatch(getProfileUser())
  }, [])

  const handleOrderStatus = async (id, status) => {
    console.log(id, status)
    let updatedOrder
    let orderIndex = allOrdersData.findIndex((order) => order.id === id)
    if (status === 'Новый') {
      updatedOrder = { status: 'В процессе' }
    } else if (status === 'В процессе') {
      if (orderIndex !== -1) {
        updatedOrder = { status: 'Готово' }
      }
    } else if (status === 'Готово') {
      if (orderIndex !== -1) {
        updatedOrder = { status: 'Завершено' }
      }
    }
    try {
      changeOrderInfoRequest(id, updatedOrder)
    } catch (err) {
      console.log(err)
    }
  }

  const changeOrderInfoRequest = async (id, data) => {
    try {
      const res = await changeOrderInfo(id, data)
      console.log(res)
      const resp = await getOrders()
      dispatch(setOrders(resp.data))
    } catch (err) {
      console.log(err)
    }
  }

  const handleOrderCart = (id, status) => {
    if (status === 'Новый') {
      console.log('handleOrderCart', id, status)
    }
  }

  const handleCancelOrder = (id) => {
    console.log('cancel order', id)
    dispatch(
      openModal({
        isOpen: true,
        modalType: 'cancelOrder',
        modalProps: { orderNumber: id },
      }),
    )
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
      <div className={styles.cardContainer}>
        <div className={styles.cardsWrapper}>
          {activeButton === 'На вынос' ? (
            <>
              {orderDataTakeAway
                .filter((order) => order.status === activeStatus)
                .map((order) => (
                  <div className={styles.cardRoot}>
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
                        {showAllItems ? null : (
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
          ) : (
            <>
              {orderData
                .filter((order) => order.status === activeStatus)
                .map((order) => (
                  <div
                    className={styles.cardRoot}
                    onClick={() => handleOrderCart(order.id, order.status)}
                  >
                    <div>
                      <div className={styles.cardHeader}>
                        <h3>{order.id}</h3>
                        <div
                          className={styles.close}
                          onClick={() => handleCancelOrder(order.id)}
                        >
                          &times;
                        </div>
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
                        {showAllItems ? null : (
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
      </div>

    </div>
  )
}
export default Orders


