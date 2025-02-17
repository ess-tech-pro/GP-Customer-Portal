import { OPTION_ALL } from "@/constants";

const initialFilter = {
  name: '',
  type: OPTION_ALL,
  status: OPTION_ALL,
};

const initialStateDataGrid = {
  pagination: {
    paginationModel: {
      pageSize: 10,
      /* page: 0 // default value will be used if not passed */
    },
  },
};

export { initialFilter, initialStateDataGrid };
