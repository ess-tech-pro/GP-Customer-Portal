import * as yup from 'yup'

export const CreateOrganizationRequestSchema = yup.object().shape({
  type: yup
    .string()
    .required('errors.type-is-required'),
  logo: yup.mixed()
    .required('errors.logo-is-required')
    .test("fileRequired", "errors.logo-is-required", (value) => {
      return value instanceof File && value.size > 0; // Kiểm tra nếu file đã được chọn
    }),
  name: yup
    .string()
    .required('errors.name-is-required')
    .test('nameLength', 'errors.maximum-name-length-is-50', () => { return true }),
  status: yup.bool(),
  description: yup
    .string(),
});

export type CreateOrganizationRequest = NonNullable<yup.InferType<typeof CreateOrganizationRequestSchema>>

export const EditOrganizationRequestSchema = yup.object().shape({
  type: yup
    .string()
    .required('errors.type-is-required'),
  logo: yup.mixed(),
  name: yup
    .string()
    .required('errors.name-is-required')
    .test('nameLength', 'errors.maximum-name-length-is-50', () => { return true }),
  status: yup.bool(),
  description: yup
    .string(),
});

export type EditOrganizationRequest = NonNullable<yup.InferType<typeof EditOrganizationRequestSchema>>
