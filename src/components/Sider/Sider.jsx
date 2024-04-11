import { exit, logo, menuIcon, orderIcon, profileIcon } from '@assets'
import { openModal } from '@store/slices/modalSlice.js'
import { Layout } from 'antd'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import styles from './sider.module.scss'

const Sider = () => {
  const dispatch = useDispatch()
  const handleExit = () => {
    dispatch(
      openModal({
        isOpen: true,
        modalType: 'exit',
        modalProps: {},
      }),
    )
  }

  return (
    <Layout.Sider className={styles.sider}>
      <img src={logo} alt="neocafe" />
      <nav className={styles.navMenu}>
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            [styles.navPoint, isActive ? styles.active : styles.links].join(' ')
          }
        >
          <img src={orderIcon} alt="Error :(" className={styles.sider_icon} />
          Заказы
        </NavLink>
        <NavLink
          to="/menu"
          className={({ isActive }) =>
            [styles.navPoint, isActive ? styles.active : styles.links].join(' ')
          }
        >
          <img src={menuIcon} alt="Error :(" className={styles.sider_icon} />
          Меню
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            [styles.navPoint, isActive ? styles.active : styles.links].join(' ')
          }
        >
          <img src={profileIcon} alt="Error :(" className={styles.sider_icon} />
          Профиль
        </NavLink>
      </nav>
      <button className={styles.sider__btn_exit} onClick={handleExit}>
        <img src={exit} alt="Error :(" className={styles.sider_icon} />
        Выйти
      </button>
    </Layout.Sider>
  )
}

export default Sider
