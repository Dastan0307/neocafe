import { Layout } from 'antd'
import Sider from '../../components/Sider/Sider'
import Header from '../../components/Header/Header'
import Content from '../../components/Content/Content'
// import styles from './main.module.scss'

const Main = () => {
  return (
    <>
      <Layout>
        <Sider />
        <Layout>
          <Header />
          <Content />
        </Layout>
      </Layout>
    </>
  )
}

export default Main
