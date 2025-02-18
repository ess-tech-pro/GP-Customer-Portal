import CustomTextField from "@/components/mui/TextField";
import { approveRegisterGame, deleteRegisterGame, getRegisterGameList, rejectRegisterGame } from "@/store/slices/gameSlice";
import { AppDispatch, RootState } from "@/store/store";
import { formatDate, formattedOptionTypes } from "@/utils/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Divider, FormControl, MenuItem, Typography, Menu, ButtonGroup } from "@mui/material"
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useTranslation } from "react-i18next";
import { toast } from 'react-toastify';
import { PAGE_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS } from "@/constants";
import PopupConfirm from "@/components/popup/PopupConfirm";

const schema = yup.object().shape({
    status: yup.string(),
    category: yup.string(),
    gameName: yup.string(),
    gameType: yup.string(),
    gameEngine: yup.string(),
    orientation: yup.string(),
    studio: yup.string(),
    events: yup.string(),
});

const RegisterGameList = () => {
    const { t } = useTranslation('registerGame');;
    const [anchorEl, setAnchorEl] = useState(null);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [gameSelected, setGameSelected] = useState<any>({});
    const optionsRegisterGame: any = useSelector((state: RootState) => state.options.optionsRegisterGame);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [list, setList] = useState([]);
    const [paging, setPaging] = useState({
        from: 0,
        size: 10,
        total: 0
    })

    const [paginationModel, setPaginationModel] = useState({
        pageSize: PAGE_SIZE_DEFAULT,
        page: PAGE_DEFAULT,
    });

    const {
        getValues,
        reset,
        control,
        handleSubmit,
        formState: { errors, isDirty },
    } = useForm({
        defaultValues: {
            status: "all",
            category: "all",
            gameName: "",
            gameType: "all",
            gameEngine: "all",
            orientation: "all",
            studio: "all",
            events: "all",

        },
        resolver: yupResolver(schema),
    });

    const handleClose = () => {
        setAnchorEl(null);
    };

    const fetchData = async () => {
        const body = {
            query: { ...getValues() },
            paging: {
                from: paginationModel.page * 10,
                size: paginationModel.pageSize
            }
        }
        const { payload } = await dispatch(getRegisterGameList(body))
        setList(payload.data.data)
        setPaging(payload.data.paging)
    }
    const onSubmit = async (data) => {
        console.log(data)
        fetchData()
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        fetchData();
    }, [paginationModel]);



    const onDelete = async () => {
        const res: any = await dispatch(deleteRegisterGame(gameSelected.id))
        if (res.payload) {
            setOpenModalDelete(false)
            setGameSelected({})
            toast.success('Delete Game Successfully');
            fetchData()
            handleClose();
        }
        if (res.error.message) {
            toast.error(res.error.message);
        }
    }


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };



    const onApprove = async (id: string) => {
        console.log(id)
        await dispatch(approveRegisterGame(id))
        handleClose();
        toast.success('Approve Game Successfully');
        fetchData()
    }

    const onReject = async (id: string) => {
        console.log(id)

        await dispatch(rejectRegisterGame(id))
        handleClose();
        toast.success('Reject Game Successfully');
        fetchData()
    }


    const columns: GridColDef[] = [
        {
            field: 'gameName',
            headerName: t('gameName'),
            sortable: false,
            flex: 1
        },
        // {
        //     field: 'studio',
        //     headerName: t('studio'),
        //     sortable: false,
        //     flex: 1

        // },
        {
            field: 'info',
            headerName: t('gameInfo'),
            sortable: false,
            flex: 1,
            renderCell: (params) => (
                <Box sx={{
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                }}>
                    <Box>{t('gameType')}: {t(`common:app-configs.gameRegister.gameType.${params.row.gameType}`)}</Box>
                    <Box>{t('gameEngine')}: {t(`common:app-configs.gameRegister.gameEngine.${params.row.gameEngine}`)}</Box>
                    <Box>{t('orientation')}: {t(`common:app-configs.gameRegister.orientation.${params.row.orientation}`)}</Box>
                    <Box>{t('event')}: {t(`common:app-configs.gameRegister.event.${params.row.events?.[0]}`)}</Box>
                </Box>
            ),
        },
        {
            field: 'gameDocuments',
            headerName: t('gameDocuments'),
            sortable: false,
            flex: 1

        },
        {
            field: 'lastUpdate',
            headerName: t('lastUpdate'),
            sortable: false,
            flex: 1,

            renderCell: (params) => (
                <Box>
                    <Box>{t('common:action.update-by')}: {params.row.createdBy}</Box>
                    <Box>{t('common:action.update-at')}: {formatDate(params.row.createdAt, 'Do MMMM YYYY')}</Box>
                </Box>
            ),
        },
        {
            field: 'description',
            headerName: t('description'),
            sortable: false,
            flex: 1

        },
        {
            field: 'status',
            headerName: t('status'),
            sortable: false,
            flex: 1,
            renderCell: (params) => (
                <Typography>{t(`common:app-configs.gameRegister.status.${params.row.status}`)}</Typography>
            ),

        },
        {
            field: 'id',
            headerName: t('actions'),
            sortable: false,
            flex: 1,
            renderCell: (params) => (
                <Box className="mt-1">
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        <Button onClick={handleClick}>▼</Button>
                    </ButtonGroup>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem>
                            <Button className="w-full" onClick={() => navigate(`/edit-register-game/${params.row.id}`)} variant="contained" color="primary">
                                {t('common:action.edit')}
                            </Button>
                        </MenuItem>
                        <MenuItem>
                            <Button className="w-full" onClick={() => { setOpenModalDelete(true); setGameSelected(params.row) }} variant="contained" color="error">
                                {t('common:action.delete')}
                            </Button>
                        </MenuItem>
                        <MenuItem>
                            <Button className="w-full" onClick={() => onApprove(params.row.id)} variant="contained" color="success">
                                {t('common:action.approve')}
                            </Button>
                        </MenuItem>
                        <MenuItem>
                            <Button className="w-full" onClick={() => onReject(params.row.id)} variant="contained" color="warning">
                                {t('common:action.reject')}
                            </Button>
                        </MenuItem>
                    </Menu>
                </Box>
            ),
        },
    ];

    const onClearFilter = () => {
        reset()
        fetchData()
    }

    return (
        <Box>
            <Box className="w-full flex justify-between items-center mb-2">
                <Typography>Register Game</Typography>
                <Button onClick={() => navigate('/create-register-game')} variant="contained" color="primary">
                    {t('common:create')}
                </Button>
            </Box>
            <Divider />
            <form className="mb-2" onSubmit={handleSubmit(onSubmit)}>
                <Box className="flex flex-wrap gap-3">
                    <Box>
                        <Box>
                            <label htmlFor="username">{t('gameName')}</label>
                        </Box>
                        <Box>
                            <FormControl className="w-50">
                                <Controller
                                    name='gameName'
                                    control={control}
                                    render={({ field }) => (
                                        <CustomTextField
                                            {...field}
                                            id='gameName'
                                            fullWidth
                                            {...(errors.gameName && { error: true, helperText: errors.gameName?.message })}
                                        />
                                    )}
                                />
                            </FormControl>
                        </Box>
                    </Box>

                    <Box>
                        <Box>
                            <label htmlFor="username">{t('category')}</label>
                        </Box>
                        <Box>
                            <FormControl className="w-50">
                                <Controller
                                    name='category'
                                    control={control}
                                    render={({ field }) => (
                                        <CustomTextField
                                            select
                                            fullWidth
                                            id='category'
                                            {...field}
                                            {...(errors.category && { error: true, helperText: errors.category?.message })}
                                        >
                                            <MenuItem value="all">
                                                All
                                            </MenuItem>
                                            {formattedOptionTypes(optionsRegisterGame.categories).map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {t(`common:app-configs.gameConfig.gameCategories.${option.label}`)}
                                                </MenuItem>
                                            ))}
                                        </CustomTextField>
                                    )}
                                />
                            </FormControl>
                        </Box>
                    </Box>

                    <Box>
                        <Box>
                            <label htmlFor="username">{t('status')}</label>
                        </Box>
                        <Box>
                            <FormControl className="w-50">
                                <Controller
                                    name='status'
                                    control={control}
                                    render={({ field }) => (
                                        <CustomTextField
                                            select
                                            fullWidth
                                            id='status'
                                            {...field}
                                            {...(errors.status && { error: true, helperText: errors.status?.message })}
                                        >
                                            <MenuItem value="all">
                                                All
                                            </MenuItem>
                                            {formattedOptionTypes(optionsRegisterGame.status).map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {t(`common:app-configs.gameRegister.status.${option.label}`)}
                                                </MenuItem>
                                            ))}
                                        </CustomTextField>
                                    )}
                                />
                            </FormControl>
                        </Box>
                    </Box>

                    <Box>
                        <Box>
                            <label htmlFor="username">{t('gameType')}</label>
                        </Box>
                        <Box>
                            <FormControl className="w-50">
                                <Controller
                                    name='gameType'
                                    control={control}
                                    render={({ field }) => (
                                        <CustomTextField
                                            select
                                            fullWidth
                                            id='gameType'
                                            {...field}
                                            {...(errors.gameType && { error: true, helperText: errors.gameType?.message })}
                                        >
                                            <MenuItem value="all">
                                                All
                                            </MenuItem>
                                            {formattedOptionTypes(optionsRegisterGame.gameType).map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {t(`common:app-configs.gameRegister.gameType.${option.label}`)}
                                                </MenuItem>
                                            ))}
                                        </CustomTextField>
                                    )}
                                />
                            </FormControl>
                        </Box>
                    </Box>

                    <Box>
                        <Box>
                            <label htmlFor="username">{t('event')}</label>
                        </Box>
                        <Box>
                            <FormControl className="w-50">
                                <Controller
                                    name='events'
                                    control={control}
                                    render={({ field }) => (
                                        <CustomTextField
                                            select
                                            fullWidth
                                            id='events'
                                            {...field}
                                            {...(errors.events && { error: true, helperText: errors.events?.message })}
                                        >
                                            <MenuItem value="all">
                                                All
                                            </MenuItem>
                                            {formattedOptionTypes(optionsRegisterGame.event).map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {t(`common:app-configs.gameRegister.event.${option.label}`)}
                                                </MenuItem>
                                            ))}
                                        </CustomTextField>
                                    )}
                                />
                            </FormControl>
                        </Box>
                    </Box>

                    <Box>
                        <Box>
                            <label htmlFor="username">{t('gameEngine')}</label>
                        </Box>
                        <Box>
                            <FormControl className="w-50">
                                <Controller
                                    name='gameEngine'
                                    control={control}
                                    render={({ field }) => (
                                        <CustomTextField
                                            select
                                            fullWidth
                                            id='gameEngine'
                                            {...field}
                                            {...(errors.gameEngine && { error: true, helperText: errors.gameEngine?.message })}
                                        >
                                            <MenuItem value="all">
                                                All
                                            </MenuItem>
                                            {formattedOptionTypes(optionsRegisterGame.gameEngine).map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {t(`common:app-configs.gameRegister.gameEngine.${option.label}`)}
                                                </MenuItem>
                                            ))}
                                        </CustomTextField>
                                    )}
                                />
                            </FormControl>
                        </Box>
                    </Box>

                    <Box>
                        <Box>
                            <label htmlFor="username">{t('orientation')}</label>
                        </Box>
                        <Box>
                            <FormControl className="w-50">
                                <Controller
                                    name='orientation'
                                    control={control}
                                    render={({ field }) => (
                                        <CustomTextField
                                            select
                                            fullWidth
                                            id='orientation'
                                            {...field}
                                            {...(errors.orientation && { error: true, helperText: errors.orientation?.message })}
                                        >
                                            <MenuItem value="all">
                                                All
                                            </MenuItem>
                                            {formattedOptionTypes(optionsRegisterGame.orientation).map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {t(`common:app-configs.gameRegister.orientation.${option.label}`)}
                                                </MenuItem>
                                            ))}
                                        </CustomTextField>
                                    )}
                                />
                            </FormControl>
                        </Box>
                    </Box>
                </Box>
                <Box className="mt-3 flex gap-3">
                    <Button type="submit" variant="contained" color="primary">
                        {t('common:action.search')}
                    </Button>
                    <Button onClick={() => onClearFilter()} disabled={!isDirty} variant="contained" color="primary">
                        {t('common:action.clear')}
                    </Button>
                </Box>
            </form>
            <Divider />
            <Paper sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={list}
                    columns={columns}
                    // initialState={{ pagination: { paging } }}
                    sx={{ border: 0, width: '100%' }}
                    getRowHeight={() => 'auto'}
                    disableRowSelectionOnClick
                    disableColumnSorting
                    disableColumnSelector
                    disableColumnMenu
                    disableColumnResize

                    pagination
                    paginationMode="server"
                    pageSizeOptions={PAGE_SIZE_OPTIONS}
                    rowCount={paging.total}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                />
            </Paper>

            {
                openModalDelete && gameSelected && <PopupConfirm
                    title="Delete!!!"
                    message={
                        `This action will be delete "${gameSelected?.gameName}`
                    }
                    onConfirm={() => onDelete()}
                    onCancel={() => setOpenModalDelete(false)} />
            }
        </Box>
    )
}

export default RegisterGameList