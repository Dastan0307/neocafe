import { loginImg, neocafeLogo } from '@assets'
import Loading from '@components/Loading/Loading'
import { checkEmail } from '@store/slices/authSlice'
import { Typography } from 'antd'
import { Field, Form, Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import styles from '../auth.module.scss'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading } = useSelector((state) => state.auth)

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Некорректный формат email')
      .required('Email обязателен'),
  })

  const handleSubmit = (email) => {
    dispatch(checkEmail({ email, navigate }))
  }

  const initialValues = {
    email: '',
  }

  return (
    <div className={styles.container}>
      {isLoading && <Loading />}
      <img
        src={loginImg}
        alt="Error :("
        style={{ width: '724px', height: '868px' }}
      />
      <div className={styles.form}>
        <img src={neocafeLogo} alt="Error :(" className={styles.login_logo} />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          onKeyPress={handleSubmit}
        >
          <Form className={styles.formik}>
            <Typography.Title level={1} className={styles.title}>
              Вход
            </Typography.Title>
            <div>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Электронная почта"
                className={styles.inp}
              />
            </div>
            <button type="submit" className={styles.btn}>
              Получить код
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default Login
