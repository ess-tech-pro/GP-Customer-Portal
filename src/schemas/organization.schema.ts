import * as yup from 'yup'

export const CreateOrganizationRequestSchema = yup.object().shape({
  type: yup
    .string()
    .required('Username is required'),
  logo: yup.mixed()
    .test("fileRequired", "Logo is required", (value) => {
      return value instanceof File && value.size > 0; // Kiểm tra nếu file đã được chọn
    }),
  name: yup
    .string()
    .required('Name is required'),
  status: yup.bool().required('Status is required'),
  description: yup
    .string(),
});

export type CreateOrganizationRequest = yup.InferType<typeof CreateOrganizationRequestSchema>
