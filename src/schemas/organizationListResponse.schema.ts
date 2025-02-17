import * as yup from 'yup'

export const OrganizationListResponseSchema = yup.object().shape({
    id: yup.string().required(),
    name: yup.string().required(),
    description: yup.string().optional(),
    type: yup.string().optional(),
    status: yup.string().optional(),
    logo: yup.string().optional(),
    createdAt: yup.string().optional(),
    updatedAt: yup.string().optional(),
    user: yup.number().optional()
})

export type OrganizationListResponse = Omit<yup.InferType<typeof OrganizationListResponseSchema>, 'id'> & {
    id: string;
}