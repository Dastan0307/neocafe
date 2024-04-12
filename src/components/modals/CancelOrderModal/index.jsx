import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../../store/slices/modalSlice'
import { getOrders, changeOrderInfo } from '../../../api/api'
import { setOrders } from '../../../store/slices/ordersSlice'

import styles from './cancelorder.module.scss'

const CancelOrderModal = ({ orderNumber }) => {
  const dispatch = useDispatch()
  const allOrdersData = useSelector((state) => state.orders.orders)

  const handleClose = () => {
    dispatch(closeModal())
  }
  const handleCancelOrder = async () => {
    let updatedOrder
    let orderIndex = allOrdersData.findIndex((order) => order.id === orderNumber)
    if (orderIndex !== -1) {
      updatedOrder = { status: 'Отменено' }
    }
    try {
      changeOrderInfoRequest(orderNumber, updatedOrder)
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
      dispatch(closeModal())
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>Отменить заказ</h2>
          <div className={styles.close} onClick={handleClose}>
            &times;
          </div>
        </div>
        <h3 className={styles.subtitle}>
          Вы действительно хотите отменить заказ {orderNumber}?
        </h3>
        <div className={styles.btn__wrapper}>
          <button
            className={styles.btn__white}
            onClick={() => handleCancelOrder()}
          >
            Да
          </button>
          <button className={styles.btn__red} onClick={handleClose}>Нет</button>
        </div>
      </div>
    </div>
  )
}

export default CancelOrderModal
