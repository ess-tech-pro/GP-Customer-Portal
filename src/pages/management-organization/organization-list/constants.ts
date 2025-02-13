const typeOptions = [
  { value: 'all', label: 'All' },
  { value: 'studio', label: 'Studio' },
  { value: 'branch', label: 'Branch' },
];

const initialFilter = {
  name: '',
  type: typeOptions[0].value,
};


const initialStateDataGrid = {
  pagination: {
    paginationModel: {
      pageSize: 10,
      /* page: 0 // default value will be used if not passed */
    },
  },
};

export { typeOptions, initialFilter, initialStateDataGrid };
