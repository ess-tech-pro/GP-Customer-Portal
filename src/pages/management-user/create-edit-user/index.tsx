import React from 'react';
import { useForm, Controller } from 'react-hook-form'
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Switch,
  Button,
  Card,
  CardContent,
  CircularProgress,
  InputAdornment,
  IconButton,
  Typography,
  Box,
  MenuItem
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createUser, updateUser, fetchDetailUser } from '@/store/slices/manageUserSlice';
import { AppDispatch, RootState } from '@/store/store';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateUserRequest, CreateUserRequestSchema } from '@/schemas';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CustomTextField from '@/components/mui/TextField';
import { roleOptions } from '../utils';


const CreateEditUser = () => {
  const { id: userId } = useParams();
  // States
  const [loading, setLoading] = useState(false)
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false)

  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: RootState) => state.login.error); // Lấy lỗi từ Redux state

  // Hooks
  const {
    control,
    reset,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
      role: '',
      status: false
    },
    resolver: yupResolver(CreateUserRequestSchema)
  })

  const { t } = useTranslation();

  useEffect(() => {
    if (userId) {
      // If editing an existing user, fetch user data and set it in the form
      dispatch(fetchDetailUser(userId)) // Dispatch an action to fetch the user data by ID
        .unwrap()
        .then((userData) => {
          // Set form fields based on user data
          setValue('username', userData.username);
          setValue('role', userData.role);
          setValue('status', userData.status);
        })
        .catch((err) => {
          toast.error('Failed to load user data');
          console.error('Error loading user data:', err);
        });
    } else {
      reset(); // Reset the form if no user is selected for editing
    }
  }, [userId, dispatch, setValue, reset]);

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)
  const handleClickShowConfirmPassword = () => setIsConfirmPasswordShown(show => !show)

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue('status', event.target.checked);
  };

  const onSubmit = async (data: CreateUserRequest) => {
    setLoading(true)
    if (userId) {
      dispatch(updateUser({ userId, ...data }))
        .unwrap()
        .then(() => {
          toast.success('User updated successfully');
        })
        .catch((err) => {
          toast.error('Update user failed');
          console.error('Update user failed:', err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      dispatch(
        createUser({
          username: data.username,
          password: data.password,
          role: data.role,
          status: data.status,
        })
      )
        .unwrap() // unwrap giúp bắt lỗi reject
        .then(() => {
          toast.success("Create user successfully");
        })
        .catch((err) => {
          toast.error('Create user failed');
          console.error('Create user failed:', err); // Có thể log lỗi nếu cần
        })
        .finally(() => {
          setLoading(false)
        })
    }
  };

  return (
    <Grid container columns={12}>
      <Box className='mb-5'>
        <Typography variant="h4">{t('createUser')}</Typography>
      </Box>

      <Card variant="outlined">
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className='p-5'>
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
                    <FormLabel htmlFor='username' required>
                      {t('userName')}
                    </FormLabel>
                  </FormControl>
                </Grid>
                <Grid size={{ md: 9, xs: 12 }}>
                  <Controller
                    name='username'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        id='username'
                        fullWidth
                        placeholder={t('userName')}
                        {...(errors.username && { error: true, helperText: errors.username?.message })}
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
                    <FormLabel htmlFor='role' required>
                      {t('role')}
                    </FormLabel>
                  </FormControl>
                </Grid>
                <Grid size={{ md: 9, xs: 12 }}>
                  <Controller
                    name='role'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        select
                        fullWidth
                        id='role'
                        placeholder='Select role'
                        defaultValue=''
                        {...field}
                        {...(errors.role && { error: true, helperText: errors.role?.message })}
                        slotProps={{
                          select: {
                            displayEmpty: true, // Ensure placeholder shows when no selection
                            renderValue: selected => {
                              if (!selected) {
                                return <em>Placeholder</em>; // Placeholder for empty selection
                              }
                              // Find the label corresponding to the selected value
                              const selectedOption = roleOptions.find(option => option.value === selected);
                              return selectedOption ? selectedOption.label : selected as string; // Show label
                            },
                          },
                        }}
                      >
                        <MenuItem disabled value=''>
                          <em>Placeholder</em>
                        </MenuItem>
                        {roleOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </CustomTextField>
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
                    <FormLabel htmlFor='password' required>
                      {t('password')}
                    </FormLabel>
                  </FormControl>
                </Grid>
                <Grid size={{ md: 9, xs: 12 }}>
                  <Controller
                    name='password'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        id='password'
                        placeholder='············'
                        type={isPasswordShown ? 'text' : 'password'}
                        autoComplete="new-password"
                        slotProps={{
                          input: {
                            endAdornment: (
                              <InputAdornment position='end'>
                                <IconButton
                                  edge='end'
                                  onClick={handleClickShowPassword}
                                  onMouseDown={e => e.preventDefault()}
                                  aria-label='toggle password visibility'
                                >
                                  {isPasswordShown ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </IconButton>
                              </InputAdornment>
                            )
                          }
                        }}
                        {...(errors.password && { error: true, helperText: errors.password?.message })}
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
                    <FormLabel htmlFor='confirm-password' required>
                      {t('confirmPassword')}
                    </FormLabel>
                  </FormControl>
                </Grid>
                <Grid size={{ md: 9, xs: 12 }}>
                  <Controller
                    name='confirmPassword'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        id='confirm-password'
                        placeholder='············'
                        type={isConfirmPasswordShown ? 'text' : 'password'}
                        error={Boolean(errors.confirmPassword)}
                        autoComplete="new-password"
                        slotProps={{
                          input: {
                            endAdornment: (
                              <InputAdornment position='end'>
                                <IconButton
                                  edge='end'
                                  onClick={handleClickShowConfirmPassword}
                                  onMouseDown={e => e.preventDefault()}
                                  aria-label='toggle password visibility'
                                >
                                  {isConfirmPasswordShown ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </IconButton>
                              </InputAdornment>
                            )
                          }
                        }}
                        {...(errors.confirmPassword && { error: true, helperText: errors.confirmPassword?.message })}
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
                  <Switch id='status' onChange={handleStatusChange} />
                  {errors.status && <FormHelperText error>{errors.status.message}</FormHelperText>}
                </Grid>
              </Grid>
              {error && <FormHelperText error>{error}</FormHelperText>}
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

export default CreateEditUser;
