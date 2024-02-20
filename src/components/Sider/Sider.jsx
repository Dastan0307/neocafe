import React, { useState } from 'react'
import { Layout } from 'antd'
import { logo, orderIcon, menuIcon, profileIcon  } from '../../assets'
import styles from './sider.module.scss'

const Sider = () => {
  const [isActive, setIsActive] = useState(false)
  const [activeItem, setActiveItem] = useState('Заказы');

  const toggleMenu = (item) => {
    setActiveItem(item === activeItem ? item : item)
  }

  return (
    <Layout.Sider className={styles.sider}>
      <img src={logo} alt="neocafe" />
      <nav className={styles.navMenu}>
        <div
          onClick={() => toggleMenu('Заказы')}
          className={activeItem === 'Заказы' ? styles.active : styles.navPoint}
        >
          <img src={orderIcon} alt="order" />
          Заказы
        </div>
        <div
          onClick={() => toggleMenu('Меню')}
          className={activeItem === 'Меню' ? styles.active : styles.navPoint}
        >
          <img src={menuIcon} alt="menu" />
          Меню
        </div>
        <div
          onClick={() => toggleMenu('Профиль')}
          className={activeItem === 'Профиль' ? styles.active : styles.navPoint}
        >
          <img src={profileIcon} alt="profile" />
          Профиль
        </div>
      </nav>
    </Layout.Sider>
  )
}

export default Sider
