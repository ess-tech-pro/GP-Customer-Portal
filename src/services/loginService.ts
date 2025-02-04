import { LoginRequest, LoginResponse, LoginResponseSchema } from '../schemas'
import axiosClient from './axiosClient'

const login = async (loginData: LoginRequest): Promise<LoginResponse> => {
	const rep = (await axiosClient.post('api/v1/auth/login', {
		username: loginData.username,
		password: loginData.password,
	})) as any

	if (rep) {
		// Format the response data to match the schema
		const dataValidate = {
			accessToken: rep.data.token,
			error: '',
		}

		// validate the response
		const validatedData = LoginResponseSchema.validate(dataValidate, {
			abortEarly: false,
		})
		return validatedData
	}

	throw new Error('Login failed')
}

export { login }
