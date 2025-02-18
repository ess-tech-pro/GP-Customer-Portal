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

export const getOrganizationDetailService = async ({ id }: any): Promise<any> => {
  try {
    const rep = (await axiosClient.get(`/config-service/api/v1/organization/detail/${id}`))
    return rep
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      throw new Error(`Validation failed: ${error.errors.join(', ')}`)
    }
    throw error
  }
} // createOrganizationService

export const createOrganizationService = async (data: any): Promise<any> => {
  try {
    const rep = (await axiosClient.post('/config-service/api/v1/organization/create', data,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    ))
    return rep
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      throw new Error(`Validation failed: ${error.errors.join(', ')}`)
    }
    throw error
  }
} // createOrganizationService

export const updateOrganizationService = async (requestParams: any): Promise<any> => {
  try {
    const rep = (await axiosClient.put(`/config-service/api/v1/organization/update/${requestParams.id}`, requestParams.data,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    ))
    return rep
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      throw new Error(`Validation failed: ${error.errors.join(', ')}`)
    }
    throw error
  }
} // updateOrganizationService
