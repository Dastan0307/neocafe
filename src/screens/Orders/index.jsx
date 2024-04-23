import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bell } from '../../assets/'
import { getOrders, changeOrderInfo, changeCafeOrderStatus } from '../../api/api'
import { getProfileUser } from '@store/slices/authSlice'
import { setOrders } from '../../store/slices/ordersSlice'
import { setActiveStatus } from '../../store/slices/statusSlice'
import { openModal } from '@store/slices/modalSlice.js'
import PaginatedOrders from './PaginatedOrdersTakeAway'
import PaginatedOrderCardsCafe from './PaginatedOrdersCafe'
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
  const orderDataCafe = useSelector((state) => state.orders.cafeOrders)

  const [isCartActive, setIsCartActive] = useState(false)

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

  const handleOrderStatus = async (id, status, place) => {
    console.log(id, status, place)
    let updatedOrder
    let orderIndex = allOrdersData.findIndex((order) => order.id === id)
    console.log(orderIndex)
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
      if(place === "На вынос"){
        changeTakeAwayOrderInfoRequest(id, updatedOrder)
      }else{
        changeCafeOrderInfoRequest(id, updatedOrder)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const changeTakeAwayOrderInfoRequest = async (id, data) => {
    try {
      console.log('id', id, 'data', data)
      const res = await changeOrderInfo(id, data)
      console.log(res)
      const resp = await getOrders()
      dispatch(setOrders(resp.data))
    } catch (err) {
      console.log(err)
    }
  }
  const changeCafeOrderInfoRequest = async (id, data) => {
    try {
      console.log('id', id, 'data', data)
      const res = await changeCafeOrderStatus(id, data)
      console.log(res)
      const resp = await getOrders()
      dispatch(setOrders(resp.data))
    } catch (err) {
      console.log(err)
    }
  }
  
  const handleOrderCart = (order) => {
    if (order.status === 'Новый') {
      dispatch(
        openModal({
          isOpen: true,
          modalType: 'cart',
          modalProps: { order: order, handleOrderStatus: handleOrderStatus, handleCancelOrder: handleCancelOrder },
        }),
      )
    }
  }

  const handleCancelOrder = (id) => {
    dispatch(
      openModal({
        isOpen: true,
        modalType: 'cancelOrder',
        modalProps: { orderNumber: id },
      }),
    )
  }

  const handleOpenNotificationComponent = () => {
    dispatch(
      openModal({
        modalType: "notification",
        modalProps: {},
      })
    );
  };

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
          <img src={bell} alt="bell" onClick={handleOpenNotificationComponent} width={48} height={48} />
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
            <PaginatedOrders
            orderDataTakeAway={orderDataTakeAway}
            activeStatus={activeStatus}
            styles={styles}
            handleCancelOrder={handleCancelOrder}
            showAllItems={showAllItems}
            setShowAllItems={setShowAllItems}
            handleOrderStatus={handleOrderStatus}
            activeButton={activeButton}
            handleOrderCart={handleOrderCart}
            />
          ) : (
            <PaginatedOrderCardsCafe
            orderDataCafe={orderDataCafe}
            activeStatus={activeStatus}
            styles={styles}
            handleCancelOrder={handleCancelOrder}
            showAllItems={showAllItems}
            setShowAllItems={setShowAllItems}
            handleOrderStatus={handleOrderStatus}
            activeButton={activeButton}
            handleOrderCart={handleOrderCart}
            />
          )}
        </div>
      </div>
    </div>
  )
}
export default Orders


