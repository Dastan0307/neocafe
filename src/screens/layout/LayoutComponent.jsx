import { Layout } from 'antd'
import Header from '@components/Header/Header'
import Content from '@components/Content/Content'
import Sider from '@components/Sider/Sider'
import styles from './layout.module.scss'

const LayoutComponent = () => {
  return (
    <Layout className={styles.layout}>
      <Sider />
      <Layout>
        <Header />
        <Content />
      </Layout>
    </Layout>
  )
}

export default LayoutComponent
