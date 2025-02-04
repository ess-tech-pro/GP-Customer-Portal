import * as yup from 'yup'

export const LoginRequestSchema = yup.object().shape({
	username: yup
		.string()
		.required('Email is required'),
	password: yup
		.string()
		.min(8, 'Password must be at least 8 characters long')
		.required('Password is required'),
})

export const LoginResponseSchema = yup.object().shape({
	accessToken: yup.string().required('Access token is required'),
	user: yup.object().shape({
		id: yup.number(),
		username: yup.string(),
		email: yup.string(),
		role: yup.string(),
		firstName: yup.string(),
		lastName: yup.string(),
		gender: yup.string(),
		image: yup.string(),
		refreshToken: yup.string(),
	}),
	error: yup.string(),
})

export type LoginRequest = yup.InferType<typeof LoginRequestSchema>
export type LoginResponse = yup.InferType<typeof LoginResponseSchema>
