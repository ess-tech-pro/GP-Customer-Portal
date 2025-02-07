import * as yup from 'yup'

export const CreateUserRequestSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  role: yup
    .string()
    .required('Role is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password confirm is required'),
  status: yup
    .string()
    .required('Status is required'),
})

export const CreateUserResponseSchema = yup.object().shape({
  id: yup.number(),
  username: yup.string(),
  role: yup.string(),
  status: yup.string(),
  createdAt: yup.string(),
  updatedAt: yup.string(),
  error: yup.string(),
})

export type CreateUserRequest = yup.InferType<typeof CreateUserRequestSchema>
export type CreateUserResponse = yup.InferType<typeof CreateUserResponseSchema>


