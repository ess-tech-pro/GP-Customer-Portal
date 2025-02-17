import CustomTextField from '@/components/mui/TextField';
import FileUploader from '@/pages/management-organization/create-edit-organization/components/FileUpload';
import { CreateOrganizationRequest, CreateOrganizationRequestSchema } from '@/schemas/organization.schema';
import { fetchDetailUser } from '@/store/slices/manageUserSlice';
import { AppDispatch } from '@/store/store';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  FormLabel,
  Switch,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import "react-quill/dist/quill.snow.css";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { OGANIZATION_INFO_DEFAULT } from './constants';
import { ReactQuillStyle } from './styles';


const CreateEditOrganization = () => {
  const { id: userId } = useParams();
  // States
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch<AppDispatch>();
  // Hooks
  const {
    control,
    reset,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors }
  } = useForm({
    defaultValues: OGANIZATION_INFO_DEFAULT,
    resolver: yupResolver(CreateOrganizationRequestSchema)
  })

  const { t } = useTranslation();

  useEffect(() => {
    if (userId) {
      // If editing an existing user, fetch user data and set it in the form
      dispatch(fetchDetailUser(userId)) // Dispatch an action to fetch the user data by ID
        .unwrap()
        .then((userData) => {
          console.log(userData);
          // Set form fields based on user data
          // setValue('username', userData.username);
          // setValue('role', userData.role);
          // setValue('status', userData.status);

          // I using reset value for form
          reset({
            // username: userData.username,
            // role: userData.role,
            // status: userData.status
          });
        })
        .catch((err) => {
          toast.error('Failed to load user data');
          console.error('Error loading user data:', err);
        });
    } else {
      reset(); // Reset the form if no user is selected for editing
    }
  }, [userId, dispatch, setValue, reset]);

  const onSubmit = async (data: CreateOrganizationRequest) => {
    setLoading(true)
    console.log(data);
  };

  return (
    <Grid container columns={12}>
      <Box className='mb-5'>
        <Typography variant="h4">{t('create_organization')}</Typography>
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
                        {...(errors.type && { error: true, helperText: errors.type?.message })}
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
                      <FileUploader field={field} errors={errors} getValues={getValues} />
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
                        {...(errors.name && { error: true, helperText: errors.name?.message })}
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
                    <FormLabel htmlFor='name' required>
                      {t('status')}
                    </FormLabel>
                  </FormControl>
                </Grid>
                <Grid size={{ md: 9, xs: 12 }}>
                  <Controller
                    name='name'
                    control={control}
                    render={({ field }) => (
                      <Switch {...field} defaultChecked={OGANIZATION_INFO_DEFAULT.status} />
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
                    name='name'
                    control={control}
                    render={({ field }) => (
                      <ReactQuillStyle
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
