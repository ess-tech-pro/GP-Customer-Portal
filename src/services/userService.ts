import { UserResponse } from '../schemas'
import axiosClient from './axiosClient'
import { UserResponseSchema } from '../schemas/user.schema'

const userInformation = async (): Promise<UserResponse> => {
    const res = (await axiosClient.get('api/v1/user/me'))
    if (res) {
        const validatedData = UserResponseSchema.validate(res.data, {
            abortEarly: false,
        })
        return validatedData
    }

    throw new Error('get User information failed')
}


export { userInformation }