import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
	email: Yup.string()
		.email('Некорректный формат email')
		.required('Email обязателен'),
})