import { Box, Button, FormLabel, MenuItem, OutlinedInput, Select, Stack, styled, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid2';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { activeOptions, fakeUsers, initialFilter, initialStateDataGrid, roleOptions } from "./constants";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "@/constants/routing";

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const UserList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState(initialFilter);
  const [users, setUsers] = useState([]);

  const handleEditUser = (id: number) => {
    navigate(`edit/${id}`);
  };

  const handleDeleteUser = (id: number) => {
    console.log("Delete User", id);
  };

  const columns: GridColDef[] = [
    {
      field: 'id', headerName: '#', width: 90,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'username',
      headerName: 'Username',
      width: 150,
      minWidth: 150,
      editable: true,
      flex: 1,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'telegramId',
      headerName: 'Telegram Id',
      width: 150,
      minWidth: 150,
      editable: true,
      flex: 1,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'active',
      headerName: 'Active',
      type: 'number',
      width: 110,
      editable: true,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'role',
      headerName: 'Role',
      sortable: false,
      width: 160,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'lastLogin',
      headerName: 'Last login',
      sortable: false,
      width: 160,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      width: 160,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <Stack spacing={2} direction="row" sx={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <Button variant="outlined" color="primary" size="small" sx={{
            width: 30,
            height: 30,
            minWidth: 30,
            border: 0,
          }}
            onClick={() => handleEditUser(params.row.id)}>
            <EditIcon />
          </Button>
          <Button variant="outlined" color="error" size="small" sx={{
            width: 30,
            height: 30,
            minWidth: 30,
            border: 0,
          }}
            onClick={() => handleDeleteUser(params.row.id)}>
            <DeleteOutlineIcon />
          </Button>
        </Stack>
      )
    },
  ];

  const fetchListUser = async () => {
    setLoading(true);
    try {
      // const response = await api.get('/users', { params: filters });
      // setUsers(response.data);

      // Fake data
      setUsers(fakeUsers);
    } catch (error) {
      console.error("Fetch Users Error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = () => {
    navigate(ROUTE_PATH.MANAGEMENT_USER_CREATE);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearchFilter = () => {
    fetchListUser();
  };

  const handleClearFilter = () => {
    setFilters(initialFilter);
  };

  useEffect(() => {
    fetchListUser();
  }, []);

  return (
    <>
      {/* Header */}
      <Stack
        spacing={2}
        direction={{ xs: "column", sm: "row" }}
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #e0e0e0',
          pb: 2,
          mb: 2,
        }}
      >
        <Typography component="h2" variant="h6" sx={{ mb: 2 }} fontWeight={600}>
          User Management
        </Typography>

        <Button variant="outlined"
          onClick={handleCreateUser}
          sx={{
            textTransform: 'none',
          }}
          startIcon={<AddIcon />} >
          Add User
        </Button>
      </Stack>

      {/* Filter */}
      <Grid container spacing={3}>
        <FormGrid size={{ xs: 12, sm: 3 }}>
          <FormLabel htmlFor="Username" sx={{ mb: 1, fontSize: 14, color: '#333', fontWeight: 600 }}>
            Username
          </FormLabel>
          <OutlinedInput
            id="username"
            name="username"
            placeholder="Username"
            autoComplete="off"
            size="small"
            value={filters.username}
            onChange={handleFilterChange}
          />
        </FormGrid>
        <FormGrid size={{ xs: 6, sm: 3 }}>
          <FormLabel htmlFor="select-active" sx={{ mb: 1, fontSize: 14, color: '#333', fontWeight: 600 }}>
            Active
          </FormLabel>
          <Select
            labelId="select-active"
            id="select-active"
            value={filters.active}
            size="small"
            name="active"
            onChange={handleFilterChange}
          >
            {activeOptions.map(option => (
              <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
            ))}
          </Select>
        </FormGrid>
        <FormGrid size={{ xs: 6, sm: 3 }}>
          <FormLabel htmlFor="select-roles" sx={{ mb: 1, fontSize: 14, color: '#333', fontWeight: 600 }}>
            Roles
          </FormLabel>
          <Select
            labelId="select-roles"
            id="select-roles"
            value={filters.role}
            size="small"
            name="role"
            onChange={handleFilterChange}
          >
            {roleOptions.map(option => (
              <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
            ))}
          </Select>
        </FormGrid>
        <FormGrid size={{ xs: 12 }}>
          <Stack spacing={2} direction={{ xs: 'row', sm: 'row' }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SearchIcon />}
              sx={{ textTransform: 'none' }}
              onClick={handleSearchFilter}
            >
              Search
            </Button>
            <Button
              variant="outlined"
              startIcon={<RestartAltIcon />}
              sx={{ ml: 1, textTransform: 'none' }}
              onClick={handleClearFilter}
            >
              Clear
            </Button>
          </Stack>
        </FormGrid>
      </Grid>

      {
        loading ? (
          <Typography component="p" variant="body1" sx={{ mt: 2 }}>
            Loading...
          </Typography>
        ) : (
          <Box sx={{ width: '100%', mt: 4 }}>
            <DataGrid
              rows={users}
              columns={columns}
              initialState={initialStateDataGrid}
              disableColumnSorting
              disableColumnSelector
              disableColumnMenu
              disableColumnResize
              sx={{
                '& .MuiDataGrid-columnHeaders': {
                  '& .MuiDataGrid-columnHeader': {
                    backgroundColor: '#1976d2',
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: 600,
                  },
                }
              }}
            />
          </Box>
        )
      }

    </ >
  );
};

export default UserList;
