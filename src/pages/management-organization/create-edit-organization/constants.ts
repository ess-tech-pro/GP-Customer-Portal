import { CreateOrganizationRequest } from "@/schemas/organization.schema";

export const OGANIZATION_INFO_DEFAULT: NonNullable<CreateOrganizationRequest> = {
  type: "",
  logo: null,
  name: "",
  status: true,
  description: "",
}
