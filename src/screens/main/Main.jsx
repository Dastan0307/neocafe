import Content from '@components/Content/Content'
import Sider from '@components/Sider/Sider'
import { Layout } from 'antd'
import styles from './main.module.scss'

const Main = () => {
  return (
    <div className={styles.main}>
      <Layout>
        <Sider />
        <Layout>
          <Content />
        </Layout>
      </Layout>
    </div>
  )
}

export default Main
