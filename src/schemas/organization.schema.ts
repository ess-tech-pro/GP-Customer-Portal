import * as yup from 'yup'

export const CreateOrganizationRequestSchema = yup.object().shape({
  type: yup
    .string()
    .required('Username is required'),
  logo: yup.mixed().required('Logo is required')
    .test('fileType', 'Only JPG and PNG files are allowed', (value) => {
      if (!value) return false; // Ensure value exists
      return value instanceof File && ['image/jpeg', 'image/png'].includes(value.type);
    }),
  name: yup
    .string()
    .required('Name is required'),
  description: yup
    .string(),
});

export type CreateOrganizationRequest = yup.InferType<typeof CreateOrganizationRequestSchema>
