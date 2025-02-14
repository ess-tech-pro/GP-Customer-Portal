import { Box, Button, FormLabel, MenuItem, OutlinedInput, Select, Stack, styled, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid2';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { statusOptions, fakeUsers, initialFilter, initialStateDataGrid, roleOptions, organizationOptions, typeOptions } from "./constants";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "@/constants/routing";
import { useTranslation } from "react-i18next";
import { PAGE_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS } from "@/constants";
import EmptyData from "@/components/data-grid/EmptyData";
import PopupConfirm from "@/components/popup/PopupConfirm";

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));


const CustomNoRowsOverlay = () => <EmptyData />;

const UserList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState(initialFilter);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [currentUserDelete, setCurrentUserDelete] = useState(null);
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: PAGE_SIZE_DEFAULT,
    page: PAGE_DEFAULT,
  });

  const handleEditUser = (id: number) => {
    navigate(`edit/${id}`);
  };


  const handleDelete = (id: string) => {
    console.log("Delete User", id);
    setOpenModalDelete(true);
  };


  const renderCellStatus = (params: GridRenderCellParams) => {
    const status = params.value;

    const statusStyles = {
      active: {
        backgroundColor: "#DFF0D8",
        color: "#3C763D",
      },
      inactive: {
        backgroundColor: "#F2DEDE",
        color: "#A94442",
      },
    };

    const styles = statusStyles[status] || {
      backgroundColor: "#F5F5F5",
      color: "#333",
    };

    return (
      <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        lineHeight: 1,
      }}>
        <Box
          sx={{
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "14px",
            textTransform: "capitalize",
            textAlign: "center",
            ...styles,
          }}
        >
          {status}
        </Box>
      </Box>
    );
  };

  const columns: GridColDef[] = [
    {
      field: 'id', headerName: '#', width: 90,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'username',
      headerName: t('username'),
      width: 150,
      minWidth: 150,
      editable: false,
      flex: 1,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'organization',
      headerName: t('organization'),
      width: 150,
      minWidth: 150,
      editable: false,
      flex: 1,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'type',
      headerName: t('type'),
      sortable: false,
      width: 160,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'role',
      headerName: t('role'),
      sortable: false,
      width: 160,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'status',
      headerName: t('status'),
      type: 'number',
      width: 110,
      editable: false,
      align: 'center',
      headerAlign: 'center',
      renderCell: renderCellStatus,
    },
    {
      field: 'action',
      headerName: t('action'),
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
            onClick={() => {
              handleDelete(params.row.id);
              setCurrentUserDelete(params.row);
            }}>
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
      setTotal(fakeUsers.length);
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

  const handleConfirmDelete = async () => {
    console.log("Delete user", currentUserDelete);
    setOpenModalDelete(false);
  };

  useEffect(() => {
    fetchListUser();
  }, []);


  console.log('currentUserDelete', currentUserDelete);
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
        <FormGrid size={{ xs: 12, sm: 2 }}>
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
        <FormGrid size={{ xs: 6, sm: 2 }}>
          <FormLabel htmlFor="select-organization" sx={{ mb: 1, fontSize: 14, color: '#333', fontWeight: 600 }}>
            {t('organization')}
          </FormLabel>
          <Select
            labelId="select-organization"
            id="select-organization"
            value={filters.organization}
            size="small"
            name="organization"
            onChange={handleFilterChange}
          >
            {organizationOptions.map(option => (
              <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
            ))}
          </Select>
        </FormGrid>
        <FormGrid size={{ xs: 6, sm: 2 }}>
          <FormLabel htmlFor="select-type" sx={{ mb: 1, fontSize: 14, color: '#333', fontWeight: 600 }}>
            {t('type')}
          </FormLabel>
          <Select
            labelId="select-type"
            id="select-type"
            value={filters.organization}
            size="small"
            name="type"
            onChange={handleFilterChange}
          >
            {typeOptions.map(option => (
              <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
            ))}
          </Select>
        </FormGrid>
        <FormGrid size={{ xs: 6, sm: 2 }}>
          <FormLabel htmlFor="select-role" sx={{ mb: 1, fontSize: 14, color: '#333', fontWeight: 600 }}>
            {t('role')}
          </FormLabel>
          <Select
            labelId="select-role"
            id="select-role"
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
        <FormGrid size={{ xs: 6, sm: 2 }}>
          <FormLabel htmlFor="select-status" sx={{ mb: 1, fontSize: 14, color: '#333', fontWeight: 600 }}>
            {t('status')}
          </FormLabel>
          <Select
            labelId="select-status"
            id="select-status"
            value={filters.status}
            size="small"
            name="status"
            onChange={handleFilterChange}
          >
            {statusOptions.map(option => (
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
              rowHeight={56}
              rowCount={total}
              pageSizeOptions={PAGE_SIZE_OPTIONS}
              paginationModel={paginationModel}
              paginationMode="server"
              onPaginationModelChange={setPaginationModel}
              slotProps={{
                pagination: {
                  labelRowsPerPage: t('rows-per-page'),
                },
              }}
              slots={{
                noRowsOverlay: CustomNoRowsOverlay
              }}
              sx={{
                '& .MuiDataGrid-columnHeaders': {
                  '& .MuiDataGrid-columnHeader': {
                    backgroundColor: '#1976d2',
                    '& .MuiDataGrid-columnSeparator': {
                      color: '#fff',
                    },
                    '& .MuiDataGrid-columnHeaderTitle': {
                      color: '#fff',
                      fontSize: 14,
                      fontWeight: 600,
                    },
                  },
                },
                '& .MuiDataGrid-footerContainer': {
                  '& .MuiDataGrid-selectedRowCount': {
                    display: 'none'
                  }
                }
              }}
            />
          </Box>
        )
      }

      {
        openModalDelete && currentUserDelete && <PopupConfirm
          title='Are you sure to delete a user?'
          message={
            `Username: "${currentUserDelete?.username || ''
            }"`
          }
          onConfirm={handleConfirmDelete}
          onCancel={() => setOpenModalDelete(false)} />
      }

    </ >
  );
};

export default UserList;
