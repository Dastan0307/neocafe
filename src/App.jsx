import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import PrivateRouter from './router/PrivateRoute'
import CheckCode from './screens/auth/check-code/CheckCode'
import Login from './screens/auth/login/Login'
import Main from './screens/main/Main'
import Orders from './screens/Orders'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route element={<PrivateRouter />}>
          <Route path="/*" element={<Main />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/code" element={<CheckCode />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
