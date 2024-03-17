import { Route, Routes } from 'react-router-dom'
import { Layout } from 'antd'
import Cart from '../../screens/Cart/index'
import styles from './content.module.scss'
import Menu from '../../screens/menu/Menu'

const Content = () => {
  return (
    <Layout.Content className={styles.content}>
      <Routes>
        <Route path="/" element={<Cart />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </Layout.Content>
  )
}

export default Content
