import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid2';
import { Box, Typography } from "@mui/material"
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import FormHelperText from '@mui/material/FormHelperText'
import CircularProgress from '@mui/material/CircularProgress'
import CardContent from '@mui/material/CardContent'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '@/store/slices/userSlice';
import { AppDispatch, RootState } from '@/store/store';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateUserRequest, CreateUserRequestSchema } from '@/schemas';
import { toast } from 'react-toastify';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useForm } from 'react-hook-form'
import CustomTextField from '@/components/mui/TextField';


const CreateEditUser = () => {
  // States
  const [loading, setLoading] = useState(false)
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false)

  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: RootState) => state.login.error); // Lấy lỗi từ Redux state

  // Hooks
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(CreateUserRequestSchema)
  })

  const { t } = useTranslation();

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)
  const handleClickShowConfirmPassword = () => setIsConfirmPasswordShown(show => !show)

  const onSubmit = async (data: CreateUserRequest) => {
    setLoading(true)
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
                  <CustomTextField
                    fullWidth
                    placeholder={t('userName')}
                    id='username'
                    {...register('username')}
                    error={Boolean(errors.username)}
                  />
                  {errors.username && <FormHelperText error>{errors.username.message}</FormHelperText>}
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
                  <CustomTextField
                    select
                    fullWidth
                    id='role'
                    placeholder='Select role'
                    defaultValue=''
                    {...register('role')}
                    error={Boolean(errors.role)}>
                    <MenuItem value='admin'>Admin</MenuItem>
                    <MenuItem value='studio'>Studio</MenuItem>
                    <MenuItem value='sale'>Sale</MenuItem>
                    <MenuItem value='brand'>Brand</MenuItem>
                  </CustomTextField>
                  {errors.role && <FormHelperText error>{errors.role.message}</FormHelperText>}
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
                  <CustomTextField
                    fullWidth
                    id='password'
                    {...register('password')}
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
                    error={Boolean(errors.password)}
                  />
                  {errors.password && <FormHelperText error>{errors.password.message}</FormHelperText>}
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
                  <CustomTextField
                    fullWidth
                    id='confirm-password'
                    {...register('confirmPassword')}
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
                  />
                  {errors.confirmPassword && <FormHelperText error>{errors.confirmPassword.message}</FormHelperText>}
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
                  <CustomTextField
                    select
                    fullWidth
                    defaultValue='active'
                    placeholder='Select status'
                    id="status"
                    {...register('status')}
                    error={Boolean(errors.status)}>
                    <MenuItem value='active'>Active</MenuItem>
                    <MenuItem value='inactive'>Inactive</MenuItem>
                  </CustomTextField>
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
