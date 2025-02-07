import { CreateUserRequest, CreateUserResponse, CreateUserResponseSchema } from "@/schemas";
import axiosClient from './axiosClient';

const createUser = async (createUserData: CreateUserRequest): Promise<CreateUserResponse> => {
  const rep = (await axiosClient.post('api/v1/auth/login', {
    username: createUserData.username,
    role: createUserData.role,
    password: createUserData.password,
    confirmPassword: createUserData.confirmPassword,
    status: createUserData.status,
  })) as any

  if (rep) {
    // Format the response data to match the schema
    const dataValidate = {
      id: rep.data.id,
      username: rep.data.username,
      role: rep.data.role,
      status: rep.data.status,
      createdAt: rep.data.createdAt,
      updatedAt: rep.data.updatedAt,
      error: '',
    }

    // validate the response
    const validatedData = CreateUserResponseSchema.validate(dataValidate, {
      abortEarly: false,
    })
    return validatedData
  }

  throw new Error('Create user failed')
}

export { createUser }
