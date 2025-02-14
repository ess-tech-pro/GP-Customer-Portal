import CustomTextField from "@/components/mui/TextField";
import { deleteRegisterGame, getRegisterGameList } from "@/store/slices/gameSlice";
import { AppDispatch, RootState } from "@/store/store";
import { formatDate, formattedOptionTypes } from "@/utils/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Divider, FormControl, MenuItem, Typography } from "@mui/material"
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useTranslation } from "react-i18next";
import { toast } from 'react-toastify';

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
    const optionsRegisterGame: any = useSelector((state: RootState) => state.options.optionsRegisterGame);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [list, setList] = useState([]);
    // const [paging, setPaging] = useState({
    //     page: 0,
    //     pageSize: 10,
    // })

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



    const fetchData = async () => {
        const body = {
            query: { ...getValues() },
            paging: { from: 0, size: 10 }
        }
        const { payload } = await dispatch(getRegisterGameList(body))
        setList(payload.data.data)
    }
    const onSubmit = async (data) => {
        console.log(data)
        fetchData()
    }

    useEffect(() => {
        fetchData()
    }, [])

    const onDelete = async (id: string) => {
        const res: any = await dispatch(deleteRegisterGame(id))
        if (res.payload) {
            toast.success('Delete Game Successfully');
            fetchData()
        }
        if (res.error.message) {
            toast.error(res.error.message);
        }
    }

    const columns: GridColDef[] = [
        {
            field: 'gameName',
            headerName: t('gameName'),
            sortable: false,
        },
        {
            field: 'studio',
            headerName: t('studio'),
            sortable: false,
        },
        {
            field: 'info',
            headerName: t('gameInfo'),
            sortable: false,
            renderCell: (params) => (
                <Box sx={{
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                }}>
                    <Box>Game Type: {params.row.gameType}</Box>
                    <Box>Game Engine: {params.row.gameEngine}</Box>
                    <Box>Orientation: {params.row.orientation}</Box>
                    <Box>Event: {params.row.events?.[0]}</Box>
                </Box>
            ),
        },
        {
            field: 'gameDocuments',
            headerName: t('gameDocuments'),
            sortable: false,
        },
        {
            field: 'lastUpdate',
            headerName: t('lastUpdate'),
            sortable: false,
            renderCell: (params) => (
                <Box>
                    <Box>Update By: {params.row.createdBy}</Box>
                    <Box>Update At: {formatDate(params.row.createdAt)}</Box>
                </Box>
            ),
        },
        {
            field: 'description',
            headerName: t('description'),
            sortable: false,
        },
        {
            field: 'status',
            headerName: t('status'),
            sortable: false,
        },
        {
            field: 'actions',
            headerName: t('actions'),
            sortable: false,
            width: 200,
            renderCell: (params) => (
                <Box className="flex gap-3">
                    <Button onClick={() => navigate(`/edit-register-game/${params.row.id}`)} variant="contained" color="primary">
                        {t('common:edit')}
                    </Button>
                    <Button onClick={() => onDelete(params.row.id)} variant="contained" color="error">
                        {t('common:delete')}
                    </Button>
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
                                                    {option.label}
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
                                                    {option.label}
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
                                                    {option.label}
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
                                                    {option.label}
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
                                                    {option.label}
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
                                                    {option.label}
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
                        {t('common:search')}
                    </Button>
                    <Button onClick={() => onClearFilter()} disabled={!isDirty} variant="contained" color="primary">
                        {t('common:clear')}
                    </Button>
                </Box>
            </form>
            <Divider />
            <Paper sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={list}
                    columns={columns}
                    // initialState={{ pagination: { paging } }}
                    pageSizeOptions={[5, 10]}
                    sx={{ border: 0 }}
                />
            </Paper>
        </Box>
    )
}

export default RegisterGameList