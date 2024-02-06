import { ToastContainer } from 'react-toastify'
import MainRoutes from './router/MainRoutes'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

function App() {
  return (
    <>
      <MainRoutes />
      <ToastContainer />
    </>
  )
}

export default App