import * as yup from 'yup'

export const OrganizationListResponseSchema = yup.object().shape({
    id: yup.string().required(),
    name: yup.string().required(),
    description: yup.string(),
    type: yup.string(),
    status: yup.string(),
    logo: yup.string(),
    createdAt: yup.string(),
    updatedAt: yup.string(),
    user: yup.number()
})

export type OrganizationListResponse = yup.InferType<typeof OrganizationListResponseSchema>
