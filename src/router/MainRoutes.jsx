import { Routes, Route } from 'react-router-dom'
import Main from '@screens/main/Main'
import CheckCode from '@screens/auth/check-code/CheckCode'
import Login from '@screens/auth/login/Login'

const MainRoutes = () => {
  const PUBLIC_ROUTES = [
    {
      link: '/',
      element: <Login />,
      id: 1,
    },
    {
      link: '/main',
      element: <Main />,
      id: 2,
    },
    {
      link: '/code',
      element: <CheckCode />,
      id: 3,
    },
  ]

  return (
    <Routes>
      {PUBLIC_ROUTES.map((item) => (
        <Route path={item.link} element={item.element} key={item.id} />
      ))}
    </Routes>
  )
}

export default MainRoutes
