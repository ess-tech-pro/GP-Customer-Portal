import {
  FetchDetailUserResponse,
  FetchDetailUserResponseSchema,
  CreateUserRequest,
  CreateUserResponse,
  CreateUserResponseSchema,
  UpdateUserRequest,
  UpdateUserResponse,
  UpdateUserResponseSchema
} from "@/schemas";
import axiosClient from './axiosClient';

const fetchDetailUser = async ({ id }: { id: string }): Promise<FetchDetailUserResponse> => {
  const rep = (await axiosClient.get(`api/v1/auth/login/${id}`)) as any

  // validate the response
  const validatedData = FetchDetailUserResponseSchema.validate(rep.data, {
    abortEarly: false,
  })
  return validatedData
}

const fetchListUser = async (filters: any): Promise<any> => {
  try {
    const response = await axiosClient.post('api/v1/auth/login/', filters)
    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return error.message;
    }
    return 'An unknown error occurred';
  }
}

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

const updateUser = async (updateUserData: UpdateUserRequest & { userId: string }): Promise<UpdateUserResponse> => {
  const rep = (await axiosClient.put(`api/v1/auth/login/${updateUserData.userId}`, {
    username: updateUserData.username,
    role: updateUserData.role,
    status: updateUserData.status,
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
    const validatedData = UpdateUserResponseSchema.validate(dataValidate, {
      abortEarly: false,
    })
    return validatedData
  }

  throw new Error('Update user failed')
}

export { fetchDetailUser, fetchListUser, createUser, updateUser }
