import { Box, Button, FormLabel, MenuItem, OutlinedInput, Select, Stack, styled, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid2';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { initialFilter, initialStateDataGrid } from "./constants";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "@/constants/routing";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { deleteOrganization, getOrganizationList } from "@/store/slices/organizationSlice";
import logoDemo from '../../../public/images/logo/react.svg';
import PopupConfirm from "@/components/popup/PopupConfirm";
import { toast } from "react-toastify";
import { PAGE_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS } from "@/constants";
import { useTranslation } from "react-i18next";
import EmptyData from "@/components/data-grid/EmptyData";
import { useAppConfig } from "@/hooks/useAppConfig";
import { useEffect, useState } from "react";
import { setBreadcrumbs } from "@/store/slices/breadcrumbsSlice";

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const CustomNoRowsOverlay = () => <EmptyData />;

const OrganizationList = () => {
  const { t } = useTranslation();
  const translateConfigOrganization = (key: string) => t(`app-configs.organization.${key}`);
  const navigate = useNavigate();
  const appConfigs = useAppConfig();
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState(initialFilter);
  const [organizations, setOrganizations] = useState([]);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [currentOrganizationDelete, setCurrentOrganizationDelete] = useState(null);
  const dispatch = useDispatch<AppDispatch>();
  const [total, setTotal] = useState(0);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: PAGE_SIZE_DEFAULT,
    page: PAGE_DEFAULT,
  });

  const typeOptions = (appConfigs?.config?.organization?.type || []).map((item) => ({
    value: item,
    label: translateConfigOrganization(`type.${item}`),
  }));

  const statusOptions = (appConfigs?.config?.organization?.status || []).map((item) => ({
    value: item,
    label: translateConfigOrganization(`status.${item}`),
  }));

  const handleEdit = (id: string) => {
    console.log("Edit User", id);
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
      field: 'no', headerName: '#', width: 90,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'name',
      headerName: t('username'),
      width: 150,
      minWidth: 150,
      editable: false,
      flex: 1,
      align: 'left',
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <Stack spacing={1} direction="row" alignItems="center" justifyContent="left" sx={{
            height: '100%'
          }}>
            <img
              src={params.row.logo || logoDemo}
              alt={params.row.name}
              onError={(e) => { e.currentTarget.src = logoDemo; }}
              style={{ width: 30, height: 30, borderRadius: '50%' }} />
            <Typography component="p" variant="body1" sx={{}}>
              {params.row.name}
            </Typography>
          </Stack>
        );
      }
    },
    {
      field: 'type',
      headerName: t('type'),
      width: 150,
      minWidth: 150,
      editable: false,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => t(params.row.type)
    },
    {
      field: 'user',
      headerName: t('user'),
      type: 'number',
      width: 110,
      editable: false,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'status',
      headerName: t('status'),
      sortable: false,
      width: 160,
      align: 'center',
      headerAlign: 'center',
      renderCell: renderCellStatus
    },
    {
      field: 'description',
      headerName: t('description'),
      sortable: false,
      width: 160,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'action',
      headerName: t('action.title'),
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
            onClick={() => handleEdit(params.row.id)}>
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
              setCurrentOrganizationDelete(params.row);
            }}>
            <DeleteOutlineIcon />
          </Button>
        </Stack>
      )
    },
  ];

  const fetchOrganizations = async () => {
    setLoading(true);
    try {
      const { payload } = await dispatch(getOrganizationList(
        {
          query: filters,
          paging: {
            from: paginationModel.page,
            size: paginationModel.pageSize
          }
        }
      ));

      const currentPage = payload.data.paging?.page || 1;
      const limit = payload.data.paging?.pageSize || 10;
      setTotal(payload.data.paging?.total || 0);

      const dataTmp = payload.data.data || [];

      const organizationsTmp = dataTmp.map((item, index) => {
        return {
          no: (currentPage - 1) * limit + index + 1,
          ...item
        }
      });

      setOrganizations(organizationsTmp);
    } catch (error) {
      console.error("Fetch Users Error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    navigate(ROUTE_PATH.MANAGEMENT_ORGANIZATION.ORGANIZATION_CREATE);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearchFilter = () => {
    fetchOrganizations();
  };

  const handleClearFilter = () => {
    setFilters(initialFilter);
    fetchOrganizations();
  };

  const handleConfirmDelete = async () => {
    if (!currentOrganizationDelete) {
      return;
    }

    try {
      const { payload } = await dispatch(deleteOrganization({
        id: currentOrganizationDelete.id
      }));

      console.log('Delete Organization', payload);

      // Show notification
      toast.success("Delete Organization Success");
    } catch (error) {
      console.error('Delete Organization Error', error);
      toast.success("Delete Organization Error");
    } finally {
      setOpenModalDelete(false);
      fetchOrganizations();
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, [paginationModel]);

  useEffect(() => {
    dispatch(
      setBreadcrumbs({
        links: [
          { name: t('home'), href: ROUTE_PATH.HOME },
          { name: t('organization-management'), href: ROUTE_PATH.MANAGEMENT_ORGANIZATION.ORGANIZATION_LIST }
        ]
      }));
  }, [setBreadcrumbs, t]);

  return (
    <Box padding={4}>
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
          {t('organization-management')}
        </Typography>

        <Button variant="outlined"
          onClick={handleCreate}
          sx={{
            textTransform: 'none',
          }}
          startIcon={<AddIcon />} >
          {t('action.create-organization')}
        </Button>
      </Stack>

      {/* Filter */}
      <Grid container spacing={3}>
        <FormGrid size={{ xs: 12, sm: 3 }}>
          <FormLabel htmlFor="name" sx={{ mb: 1, fontSize: 14, color: '#333', fontWeight: 600 }}>
            {t('name')}
          </FormLabel>
          <OutlinedInput
            id="name"
            name="name"
            placeholder="Name"
            autoComplete="off"
            size="small"
            value={filters.name}
            onChange={handleFilterChange}
          />
        </FormGrid>
        <FormGrid size={{ xs: 6, sm: 3 }}>
          <FormLabel htmlFor="select-type" sx={{ mb: 1, fontSize: 14, color: '#333', fontWeight: 600 }}>
            {t('type')}
          </FormLabel>
          <Select
            labelId="select-type"
            id="select-type"
            value={filters.type}
            size="small"
            name="type"
            onChange={handleFilterChange}
          >
            <MenuItem key='all' value='all'>{t('all')}</MenuItem>
            {typeOptions.map(option => (
              <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
            ))}
          </Select>
        </FormGrid>
        <FormGrid size={{ xs: 6, sm: 3 }}>
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
            <MenuItem key='all' value='all'>{t('all')}</MenuItem>
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
              {t('action.search')}
            </Button>
            <Button
              variant="outlined"
              startIcon={<RestartAltIcon />}
              sx={{ ml: 1, textTransform: 'none' }}
              onClick={handleClearFilter}
            >
              {t('action.clear')}
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
              rows={organizations}
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
        openModalDelete && currentOrganizationDelete && <PopupConfirm
          title={
            `Are you sure to delete organization "${currentOrganizationDelete?.name || ''
            }"?`
          }
          message={
            `All users belonging to the organization "${currentOrganizationDelete?.name || ''
            }" will be deleted.`
          }
          onConfirm={handleConfirmDelete}
          onCancel={() => setOpenModalDelete(false)} />
      }
    </Box>
  );
};

export default OrganizationList;
