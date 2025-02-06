import { Box, Button, FormLabel, MenuItem, OutlinedInput, Select, Stack, styled, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid2';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const UserList = () => {
  const data: {
    columns: GridColDef[],
    rows: {
      id: number,
      username: string,
      telegramId: string,
      active: number,
      role: string,
      lastLogin: string,
    }[]
  } = {
    columns: [
      {
        field: 'id', headerName: '#', width: 90,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'username',
        headerName: 'Username',
        width: 150,
        editable: true,
        flex: 1,
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'telegramId',
        headerName: 'Telegram Id',
        width: 150,
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
        renderCell: () => (
          <Stack spacing={2} direction="row" sx={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Button variant="outlined" color="primary" size="small" sx={{
              width: 30,
              height: 30,
              minWidth: 30,
              border: 0,
            }}
              onClick={() => console.log("Edit User")}>
              <EditIcon />
            </Button>
            <Button variant="outlined" color="error" size="small" sx={{
              width: 30,
              height: 30,
              minWidth: 30,
              border: 0,
            }}
              onClick={() => console.log("Delete User")}>
              <DeleteOutlineIcon />
            </Button>
          </Stack>
        )
      },
    ],
    rows: [
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
    ],
  }
  const initialState = {
    pagination: {
      paginationModel: {
        pageSize: 25,
        /* page: 0 // default value will be used if not passed */
      },
    },
  };

  return (
    <Box>
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
          onClick={() => console.log("Add User")}
          sx={{
            textTransform: 'none',
          }}
          startIcon={<AddIcon />} >
          Add User
        </Button>
      </Stack>

      {/* Filter */}
      <Grid container spacing={3}>
        <FormGrid size={{ xs: 3 }}>
          <FormLabel htmlFor="Username" sx={{ mb: 1, fontSize: 14, color: '#333', fontWeight: 600 }}>
            Username
          </FormLabel>
          <OutlinedInput
            id="username"
            name="username"
            // type="state"
            placeholder="Username"
            // autoComplete="State"
            size="small"
          />
        </FormGrid>
        <FormGrid size={{ xs: 3 }}>
          <FormLabel htmlFor="select-active" sx={{ mb: 1, fontSize: 14, color: '#333', fontWeight: 600 }}>
            Active
          </FormLabel>
          <Select
            labelId="select-active"
            id="select-active"
            value={10}
            size="small"
            inputProps={{ 'aria-label': 'Without label' }}
          // onChange={handleChange}
          >
            <MenuItem value={10}>All</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormGrid>
        <FormGrid size={{ xs: 3 }}>
          <FormLabel htmlFor="select-roles" sx={{ mb: 1, fontSize: 14, color: '#333', fontWeight: 600 }}>
            Roles
          </FormLabel>
          <Select
            labelId="select-roles"
            id="select-roles"
            value={10}
            size="small"
            inputProps={{ 'aria-label': 'Without label' }}
          // onChange={handleChange}
          >
            <MenuItem value={10}>All</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormGrid>
        <FormGrid size={{ xs: 12 }}>
          <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
            <Button variant="contained" color="primary"
              startIcon={<SearchIcon />} sx={{ textTransform: 'none' }}>
              Search
            </Button>
            <Button variant="outlined" startIcon={<RestartAltIcon />} sx={{ ml: 1, textTransform: 'none' }}>
              Clear
            </Button>
          </Stack>
        </FormGrid>
      </Grid>

      {/* Table */}
      <Box sx={{ width: '100%', mt: 4 }}>
        <DataGrid
          rows={data.rows}
          columns={data.columns}
          initialState={initialState}
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

    </Box >
  );
};

export default UserList;
