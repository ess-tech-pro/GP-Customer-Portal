import {
	// IGameDetailInfoRequest,
	IGameDetailInfoResponse,
} from '@/schemas/gameDetailInfo.schema'
import axiosClient from './axiosClient'
import * as yup from 'yup'

export const getGameDetailService = async ({
	id,
}: {
	id: string
}): // params: IGameDetailInfoRequest
	Promise<IGameDetailInfoResponse | any> => {
	try {
		const rep = await axiosClient.get(`/api/v1/game/game-detail-public/${id}`)
		return rep.data
	} catch (error) {
		if (error instanceof yup.ValidationError) {
			console.error('Validation Errors:', error.errors) // Log danh sách lỗi
			throw new Error(`Validation failed: ${error.errors.join(', ')}`)
		}
		throw error // Ném lại lỗi khác (nếu không phải lỗi validate)
	}
} // getGameDetailInfo


export const getGameListService = async (
	filters: any
): Promise<any> => {
	try {
		// await CreateProductRequestSchema.validate(cartData, { abortEarly: false })

		const response = await axiosClient.post('/api/v1/game/list-game-public', filters)

		// const validatedData = await CreateProductResponseSchema.validate(response, {
		// 	abortEarly: false,
		// })

		// return validatedData

		return response
	} catch (error) {
		if (error instanceof yup.ValidationError) {
			throw new Error(`Validation failed: ${error.errors.join(', ')}`)
		}
		throw error
	}
}
