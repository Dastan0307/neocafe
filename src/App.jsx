import { ToastContainer } from 'react-toastify'
import MainRoutes from './router/MainRoutes'
// import { LayoutComponent } from '@screens/layout/LayoutComponent'
import LayoutComponent from '@screens/layout/LayoutComponent'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

function App() {
  return (
    <>
      {/* <MainRoutes />
      <ToastContainer /> */}
      <LayoutComponent />
    </>
  )
}

export default App
