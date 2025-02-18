import CustomTextField from '@/components/mui/TextField';
import FileUploader from '@/pages/management-organization/create-edit-organization/components/FileUpload';
import { CreateOrganizationRequestSchema, EditOrganizationRequest, EditOrganizationRequestSchema } from '@/schemas/organization.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  FormLabel,
  MenuItem,
  Switch,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import "react-quill/dist/quill.snow.css";
import { ORGANIZATION_INFO_DEFAULT } from './constants';
import { ReactQuillStyled, InputDisabledStyled } from './styles';
import { useDispatch } from 'react-redux';
import { createOrganization, getOrganizationDetail, updateOrganization } from '@/store/slices/organizationSlice';
import { AppDispatch } from '@/store/store';
import { useAppConfig } from '@/hooks/useAppConfig';
import { toast } from 'react-toastify';
import { ROUTE_PATH } from '@/constants/routing';


const CreateEditOrganization = () => {
  // States
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const { t } = useTranslation();
  const appConfigs = useAppConfig();
  const translateConfigOrganization = (key: string) => t(`app-configs.organization.${key}`);
  const navigate = useNavigate()
  const { id } = useParams()

  // Hooks
  const {
    control,
    reset,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm({
    defaultValues: id ? {} : ORGANIZATION_INFO_DEFAULT,
    resolver: yupResolver(id ? EditOrganizationRequestSchema : CreateOrganizationRequestSchema)
  })

  const [organizationInfo, setOrganizationInfo] = useState<{ [key: string]: any }>({})

  const callback = useCallback(async () => {
    if (id) {
      const res: any = await dispatch(getOrganizationDetail({ id }))

      if (res.payload.data) {
        const dataFormatted: EditOrganizationRequest = {
          name: res.payload.data.name,
          description: res.payload.data.description,
          type: res.payload.data.type,
          status: res.payload.data.status === 'active',
          logo: res.payload.data.logo,
        }
        reset(dataFormatted)
        setOrganizationInfo(dataFormatted)
      } else if (res.error) {
        toast.error('The organization information is currently not available, please try again later.')

        navigate({
          pathname: ROUTE_PATH.MANAGEMENT_ORGANIZATION.ORGANIZATION_LIST,
        })
      }
    }
  }, [])

  useEffect(() => {
    callback()
  }, [])

  const typeOptions = useMemo(() => (appConfigs?.config?.organization?.type || []).map((item) => ({
    value: item,
    label: translateConfigOrganization(`type.${item}`),
  })), []);

  const statusOptions = useMemo(() => (appConfigs?.config?.organization?.status || []).map((item) => ({
    value: item,
    label: translateConfigOrganization(`status.${item}`),
  })), []);

  // eslint-disable-next-line consistent-return
  const onSubmit = async (data: EditOrganizationRequest) => {
    if (id) {
      let isChanged = false
      // eslint-disable-next-line no-restricted-syntax
      for (const key in data) {
        if (data[key] !== organizationInfo[key]) {
          isChanged = true
          break
        }
      }

      if (!isChanged) {
        return toast.warn("Nothing has changed")
      }
    }

    setLoading(true)

    const formData = new FormData()
    // eslint-disable-next-line no-restricted-syntax
    for (const key in data) {
      if (statusOptions && statusOptions.length && key === 'status') {
        const status = (statusOptions[Math.abs(Number(data[key]) - 1)]?.value ?? data[key]) as unknown as string
        formData.append(key, status)
      }

      else
        formData.append(key, data[key])
    }

    if (id && typeof formData.get('logo') === 'string') {
      formData.delete('logo')
    }

    const res: any = await dispatch(id ? updateOrganization({
      data: formData,
      id,
    }) : createOrganization(formData))

    if (res.payload.data) {
      toast.success(id ? 'Edit Organization Success!' : 'Create Organization Success!');
      navigate({
        pathname: ROUTE_PATH.MANAGEMENT_ORGANIZATION.ORGANIZATION_LIST,
      })
    }

    if (res.error.message) {
      toast.error(id ? 'Edit Organization Fail. Please try again later' : 'Create Organization Fail. Please try again later');
    }
  };

  return (
    <Grid container columns={12}>
      <Box className='mb-5'>
        <Typography variant="h4">{t('create-organization')}</Typography>
      </Box>

      <Card variant="outlined">
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className='md:p-5'>
            <Grid container spacing={3}>
              <Grid
                size={{ xs: 12 }}
                container
                spacing={6}
                justifyContent='space-between'
                alignItems='center'
              >
                <Grid
                  size={{ md: 3, xs: 12 }}
                  textAlign={{ md: 'right', xs: 'left' }}
                >
                  <FormControl>
                    <FormLabel htmlFor='type' required>
                      {t('type')}
                    </FormLabel>
                  </FormControl>
                </Grid>
                {
                  !id &&
                    typeOptions &&
                    typeOptions.length ?
                    <Grid size={{ md: 9, xs: 12 }}>
                      <Controller
                        name='type'
                        control={control}
                        render={({ field }) => (
                          <CustomTextField
                            {...field}
                            select
                            id='type'
                            fullWidth
                            placeholder={t('type')}
                            defaultValue={ORGANIZATION_INFO_DEFAULT.type}
                            {...(errors.type && errors.type.message && { error: true, helperText: t(errors.type.message) })}
                          >
                            {
                              typeOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value} >
                                  {option.label}
                                </MenuItem>
                              ))
                            }
                          </CustomTextField>
                        )}
                      />
                    </Grid> :
                    organizationInfo.type &&
                    <InputDisabledStyled>
                      {translateConfigOrganization(`type.${organizationInfo.type}`)}
                    </InputDisabledStyled>
                }
              </Grid>
              <Grid
                size={{ xs: 12 }}
                container
                spacing={6}
                justifyContent='space-between'
                alignItems='center'
              >
                <Grid
                  size={{ md: 3, xs: 12 }}
                  textAlign={{ md: 'right', xs: 'left' }}
                >
                  <FormControl>
                    <FormLabel htmlFor='logo' required>
                      {t('logo')}
                    </FormLabel>
                  </FormControl>
                </Grid>
                <Grid size={{ md: 9, xs: 12 }}>
                  <Controller
                    name='logo'
                    control={control}
                    render={({ field }) => (
                      <FileUploader field={field} errors={errors} getValues={getValues} logo={organizationInfo.logo} />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid
                size={{ xs: 12 }}
                container
                spacing={6}
                justifyContent='space-between'
                alignItems='center'
              >
                <Grid
                  size={{ md: 3, xs: 12 }}
                  textAlign={{ md: 'right', xs: 'left' }}
                >
                  <FormControl>
                    <FormLabel htmlFor='name' required>
                      {t('name')}
                    </FormLabel>
                  </FormControl>
                </Grid>
                <Grid size={{ md: 9, xs: 12 }}>
                  <Controller
                    name='name'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        id='name'
                        placeholder={t('name')}
                        type="text"
                        error={Boolean(errors.name)}
                        autoComplete="name"
                        {...(errors.name && errors.name.message && { error: true, helperText: t(errors.name.message) })}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid
                size={{ xs: 12 }}
                container
                spacing={6}
                justifyContent='space-between'
                alignItems='center'
              >
                <Grid
                  size={{ md: 3, xs: 12 }}
                  textAlign={{ md: 'right', xs: 'left' }}
                >
                  <FormControl>
                    <FormLabel htmlFor='status' required>
                      {t('status')}
                    </FormLabel>
                  </FormControl>
                </Grid>
                <Grid size={{ md: 9, xs: 12 }}>
                  <Controller
                    name='status'
                    control={control}
                    render={({ field }) => (
                      <Switch {...field} defaultChecked={ORGANIZATION_INFO_DEFAULT.status} />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid
                size={{ xs: 12 }}
                container
                spacing={6}
                justifyContent='space-between'
                alignItems='center'
              >
                <Grid
                  size={{ md: 3, xs: 12 }}
                  textAlign={{ md: 'right', xs: 'left' }}
                >
                  <FormControl>
                    <FormLabel htmlFor='description'>
                      {t('description')}
                    </FormLabel>
                  </FormControl>
                </Grid>
                <Grid size={{ md: 9, xs: 12 }}>
                  <Controller
                    name='description'
                    control={control}
                    render={({ field }) => (
                      <ReactQuillStyled
                        {...field}
                        onChange={(content) => field.onChange(content)}
                        theme="snow"
                        placeholder={t('description')}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid size={{ xs: 12 }} className='flex gap-4' justifyContent='center'>
                <Button
                  variant='outlined'
                  type='reset'
                  style={{ textTransform: 'capitalize' }}
                  onClick={() => reset()}
                >
                  {t('cancel')}
                </Button>
                <Button
                  variant='contained'
                  type='submit'
                  className='gap-2'
                  style={{ textTransform: 'capitalize' }}
                >
                  {loading && <CircularProgress size={20} color='inherit' />}
                  {t('create')}
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CreateEditOrganization;
