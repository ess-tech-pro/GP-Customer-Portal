import * as yup from 'yup'
import axiosClient from './axiosClient'

export const getConfigsService = async (): Promise<any> => {
    try {
        const response = await axiosClient.get('/config-service/api/v1/app-config/get-configs')
        return response
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            console.error('Validation Errors:', error.errors)
            throw new Error(`Validation failed: ${error.errors.join(', ')}`)
        }
        throw error
    }
}