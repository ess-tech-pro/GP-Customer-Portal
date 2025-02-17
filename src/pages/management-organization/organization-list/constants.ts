const typeOptions = [
  { value: 'all', label: 'All' },
  { value: 'studio', label: 'Studio' },
  { value: 'brand', label: 'Brand' },
];

const statusOptions = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];

const initialFilter = {
  name: '',
  type: typeOptions[0].value,
  status: statusOptions[0].value,
};


const initialStateDataGrid = {
  pagination: {
    paginationModel: {
      pageSize: 10,
      /* page: 0 // default value will be used if not passed */
    },
  },
};

export { typeOptions, statusOptions, initialFilter, initialStateDataGrid };
