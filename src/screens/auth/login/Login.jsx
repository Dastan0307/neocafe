import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { checkEmail } from '@store/slices/authSlice'

const Login = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Некорректный формат email')
      .required('Email обязателен'),
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (email) => {
    dispatch(checkEmail({ email, navigate }))
  }

  const initialValues = {
    email: '',
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div>
          <label htmlFor="email">Email:</label>
          <Field type="text" id="email" name="email" />
          <ErrorMessage name="email" component="div" />
        </div>
        <button type="submit">Получить код</button>
      </Form>
    </Formik>
  )
}

export default Login
