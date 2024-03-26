import Orders from '@screens/Orders/index'
import Menu from '@screens/menu/Menu'
import Profile from '@screens/profile/Profile'
import { Layout } from 'antd'
import { Route, Routes } from 'react-router-dom'
import styles from './content.module.scss'

const Content = () => {
  return (
    <Layout.Content className={styles.content}>
      <Routes>
        <Route path="/orders" element={<Orders />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Layout.Content>
  )
}

export default Content
