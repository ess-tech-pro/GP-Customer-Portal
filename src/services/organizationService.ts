import axiosClient from "./axiosClient"
import * as yup from 'yup'

export const getOrganizationListService = async (
  filters: any
): Promise<any> => {
  try {
    const response = await axiosClient.post('/config-service/api/v1/organization/list', filters)

    return response
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      throw new Error(`Validation failed: ${error.errors.join(', ')}`)
    }
    throw error
  }
}

export const deleteOrganizationService = async (id: string): Promise<any> => {
  try {
    const response = await axiosClient.delete(`/config-service//api/v1/organization/delete/${id}`)

    return response
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      throw new Error(`Validation failed: ${error.errors.join(', ')}`)
    }
    throw error
  }
}
