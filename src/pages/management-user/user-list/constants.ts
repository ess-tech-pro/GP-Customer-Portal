const statusOptions = [
  { value: 0, label: 'All' },
  { value: 1, label: 'Active' },
  { value: 2, label: 'Inactive' },
];

const roleOptions = [
  { value: 0, label: 'All' },
  { value: 1, label: 'Admin' },
  { value: 2, label: 'Leader' },
  { value: 3, label: 'Member' },
];

const organizationOptions = [
  { value: 'all', label: 'All' },
  { value: 'brand', label: 'Brand' },
  { value: 'studio', label: 'Studio' },
];

const typeOptions = [
  { value: 'all', label: 'All' },
  { value: 'brand', label: 'Brand' },
];

const initialFilter = {
  username: '',
  organization: organizationOptions[0].value,
  type: typeOptions[0].value,
  role: roleOptions[0].value,
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

const fakeUsers = [
  {
    id: 1,
    username: 'Snow',
    organization: 'Jon',
    status: 'active',
    role: 'Admin',
    type: 'Admin',
  },
  {
    id: 2, username: 'Lannister', organization: 'Jon',
    status: 'active',
    role: 'Admin',
    type: 'Admin',
  },
  {
    id: 3, username: 'Lannister', organization: 'Jon',
    status: 'active',
    role: 'Admin',
    type: 'Admin',
  },
  {
    id: 4, username: 'Stark', organization: 'Jon',
    status: 'active',
    role: 'Admin',
    type: 'Admin',
  },
  {
    id: 5, username: 'Targaryen', organization: 'Jon',
    status: 'active',
    role: 'Admin',
    type: 'Admin',
  },
  {
    id: 6, username: 'Melisandre', organization: 'Jon',
    status: 'active',
    role: 'Admin',
    type: 'Admin',
  },
  {
    id: 7, username: 'Clifford', organization: 'Jon',
    status: 'active',
    role: 'Admin',
    type: 'Admin',
  },
  {
    id: 8, username: 'Frances', organization: 'Jon',
    status: 'inactive',
    role: 'Admin',
    type: 'Admin',
  },
  {
    id: 9, username: 'Roxie', organization: 'Jon',
    status: 'inactive',
    role: 'Admin',
    type: 'Admin',
  },
  {
    id: 10, username: 'Roxie 2', organization: 'Jon 2',
    status: 'inactive',
    role: 'Leader',
    type: 'Admin',
  },
];

export { typeOptions, organizationOptions, statusOptions, roleOptions, initialFilter, initialStateDataGrid, fakeUsers };
