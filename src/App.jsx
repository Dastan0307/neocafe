import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import PrivateRouter from './router/PrivateRoute'
import Login from './screens/auth/login/Login'
import Main from './screens/main/Main'
import './App.css'

function App() {
  return (
    <>
      <div className="app">
        <Routes>
          <Route element={<PrivateRouter />}>
            <Route path="/*" element={<Main />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
        <ToastContainer />
      </div>
    </>
  )
}

export default App
