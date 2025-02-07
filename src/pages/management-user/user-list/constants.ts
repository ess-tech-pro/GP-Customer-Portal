const activeOptions = [
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

const initialFilter = {
  username: '',
  active: activeOptions[0].value,
  role: roleOptions[0].value,
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
    telegramId: 'Jon',
    active: 35,
    role: 'Admin',
    lastLogin: '2021-10-10',
  },
  {
    id: 2, username: 'Lannister', telegramId: 'Jon',
    active: 35,
    role: 'Admin',
    lastLogin: '2021-10-10',
  },
  {
    id: 3, username: 'Lannister', telegramId: 'Jon',
    active: 35,
    role: 'Admin',
    lastLogin: '2021-10-10',
  },
  {
    id: 4, username: 'Stark', telegramId: 'Jon',
    active: 35,
    role: 'Admin',
    lastLogin: '2021-10-10',
  },
  {
    id: 5, username: 'Targaryen', telegramId: 'Jon',
    active: 35,
    role: 'Admin',
    lastLogin: '2021-10-10',
  },
  {
    id: 6, username: 'Melisandre', telegramId: 'Jon',
    active: 35,
    role: 'Admin',
    lastLogin: '2021-10-10',
  },
  {
    id: 7, username: 'Clifford', telegramId: 'Jon',
    active: 35,
    role: 'Admin',
    lastLogin: '2021-10-10',
  },
  {
    id: 8, username: 'Frances', telegramId: 'Jon',
    active: 35,
    role: 'Admin',
    lastLogin: '2021-10-10',
  },
  {
    id: 9, username: 'Roxie', telegramId: 'Jon',
    active: 35,
    role: 'Admin',
    lastLogin: '2021-10-10',
  },
  {
    id: 10, username: 'Roxie 2', telegramId: 'Jon 2',
    active: 35,
    role: 'Leader',
    lastLogin: '2021-10-10',
  },
];

export { activeOptions, roleOptions, initialFilter, initialStateDataGrid, fakeUsers };
