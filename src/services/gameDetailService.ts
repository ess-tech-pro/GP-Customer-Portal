import {
	// IGameDetailInfoRequest,
	IGameDetailInfoResponse,
} from '@/schemas/gameDetailInfo.schema'
// import axiosClient from './axiosClient'
import * as yup from 'yup'

export const getGameDetailInfo = async (): // params: IGameDetailInfoRequest
Promise<IGameDetailInfoResponse | any> => {
	try {
		return {}
	} catch (error) {
		if (error instanceof yup.ValidationError) {
			console.error('Validation Errors:', error.errors) // Log danh sách lỗi
			throw new Error(`Validation failed: ${error.errors.join(', ')}`)
		}
		throw error // Ném lại lỗi khác (nếu không phải lỗi validate)
	}
} // getGameDetailInfo
