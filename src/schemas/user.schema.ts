import * as yup from 'yup'


export const UserResponseSchema = yup.object().shape({
	_id: yup.string(),
	username: yup.string(),
	telegramId: yup.string(),
	active: yup.boolean(),
	createdBy: yup.string(),
	managedBy: yup.array().of(yup.string()),
	roles: yup.array().of(
		yup.object().shape({
			_id: yup.string(),
			name: yup.string()
		})
	),
	lastLoginAt: yup.number(),
	isEnableAuth2Fa: yup.boolean(),
	isAuth2Fa: yup.boolean(),
	permissions: yup.object()
})

export type UserResponse = yup.InferType<typeof UserResponseSchema>
