import { FetchAppConfigResponseSchema, AppConfigResponse } from '@/schemas'
import axiosClient from './axiosClient'

const fetchAppConfig = async (): Promise<AppConfigResponse> => {
  const response = await axiosClient.get('config-service/api/v1/app-config/get-configs')

  // validate the response
  const validatedData = FetchAppConfigResponseSchema.validate(response.data, {
    abortEarly: false,
  })
  return validatedData
}

export { fetchAppConfig }
