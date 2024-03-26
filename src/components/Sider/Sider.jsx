import { Layout } from 'antd'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { logo, menuIcon, orderIcon, profileIcon } from '../../assets'
import styles from './sider.module.scss'

const Sider = () => {
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
    </Layout.Sider>
  )
}

export default Sider
