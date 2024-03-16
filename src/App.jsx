import { ToastContainer } from 'react-toastify'
import MainRoutes from './router/MainRoutes'
// import { LayoutComponent } from '@screens/layout/LayoutComponent'
import LayoutComponent from '@screens/layout/LayoutComponent'
import 'react-toastify/dist/ReactToastify.css'
import { Header } from 'antd/es/layout/layout'
import Login from './screens/auth/login/Login'
import Main from './screens/main/Main'

import './App.css'
import Sider from './components/Sider/Sider'
import Orders from './screens/Orders'
import Cart from './screens/Cart'
function App() {
  return (
    <>
      {/* <MainRoutes />
      <ToastContainer /> */}
      {/* <LayoutComponent /> */}
      <div style={{'display':'flex'}}>
        <Sider />
        <Orders />
      </div>
      {/* <Cart/> */}

    </>
  )
}

export default App
