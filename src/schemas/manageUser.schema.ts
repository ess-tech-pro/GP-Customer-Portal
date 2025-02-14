import * as yup from 'yup'

export const FetchDetailUserResponseSchema = yup.object().shape({
  id: yup.number(),
  username: yup.string(),
  role: yup.string(),
  status: yup.boolean(),
  createdAt: yup.string(),
  updatedAt: yup.string(),
})

export const CreateUserRequestSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  role: yup
    .string()
    .required('Role is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password confirm is required'),
  status: yup
    .boolean()
    .required('Status is required'),
})

export const UpdateUserRequestSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  role: yup
    .string()
    .required('Role is required'),
  status: yup
    .boolean()
    .required('Status is required'),
})

export const CreateUserResponseSchema = yup.object().shape({
  id: yup.number(),
  username: yup.string(),
  role: yup.string(),
  status: yup.boolean(),
  createdAt: yup.string(),
  updatedAt: yup.string(),
  error: yup.string(),
})

export const UpdateUserResponseSchema = yup.object().shape({
  id: yup.number(),
  username: yup.string(),
  role: yup.string(),
  status: yup.boolean(),
  createdAt: yup.string(),
  updatedAt: yup.string(),
  error: yup.string(),
})

export type FetchDetailUserResponse = yup.InferType<typeof FetchDetailUserResponseSchema>

export type CreateUserRequest = yup.InferType<typeof CreateUserRequestSchema>
export type CreateUserResponse = yup.InferType<typeof CreateUserResponseSchema>

export type UpdateUserRequest = yup.InferType<typeof UpdateUserRequestSchema>
export type UpdateUserResponse = yup.InferType<typeof UpdateUserResponseSchema>

