import { getGameList } from "@/store/slices/gameSlice";
import { AppDispatch, RootState } from "@/store/store";
import { Box, Typography } from "@mui/material"
import Grid from '@mui/material/Grid2';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { formatDate, formattedOptionTypes, getValueByLang } from '@/utils/utils';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomTextField from "@/components/mui/TextField";
import AztecImg from '../../public/images/aztec.jpeg';

const schema = yup.object().shape({
  gameName: yup.string(),
  category: yup.string(),
  currency: yup.string(),
  langs: yup.string(),
  status: yup.string(),
});


const GameList = () => {
  const options: any = useSelector((state: RootState) => state.options.optionsGameConfig);
  const { t, i18n } = useTranslation(['registerGame', 'publicGame']);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [games, setGames] = useState([]);

  const {
    getValues,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      gameName: "",
      category: "all",
      currency: "all",
      langs: "all",
      status: "all",
    },
    resolver: yupResolver(schema),
  });

  const fetchGameList = async () => {
    const { payload } = await dispatch(getGameList(getValues()));
    setGames(payload.data.data);
  };
  useEffect(() => {
    fetchGameList();
  }, [watch('gameName'), watch('category'), watch('currency'), watch('langs'), watch('status')]);

  const onSubmit = async (data) => {
    console.log(data)
  }

  return (
    <Box>
      <form className="mb-2" onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{
          backgroundColor: '#f1eff1',
          paddingY: '16px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        }}>
          <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            justifyContent: 'center'
          }}>
            <Box>
              <Box>
                <label className="font-bold" htmlFor="username">{t('gameName')}</label>
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
                <label className="font-bold" htmlFor="username">{t('category')}</label>
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
                        {formattedOptionTypes(options.gameCategories).map((option) => (
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
                <label className="font-bold" htmlFor="username">{t('publicGame:currency')}</label>
              </Box>
              <Box>
                <FormControl className="w-50">
                  <Controller
                    name='currency'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        select
                        fullWidth
                        id='currency'
                        {...field}
                        {...(errors.currency && { error: true, helperText: errors.currency?.message })}
                      >
                        <MenuItem value="all">
                          All
                        </MenuItem>
                        {formattedOptionTypes(options.currencies).map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {t(`common:app-configs.gameConfig.currencies.${option.label}`)}
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
                <label className="font-bold" htmlFor="username">{t('publicGame:lang')}</label>
              </Box>
              <Box>
                <FormControl className="w-50">
                  <Controller
                    name='langs'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        select
                        fullWidth
                        id='langs'
                        {...field}
                        {...(errors.langs && { error: true, helperText: errors.langs?.message })}
                      >
                        <MenuItem value="all">
                          All
                        </MenuItem>
                        {formattedOptionTypes(options.langs).map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {t(`common:app-configs.gameConfig.langs.${option.label}`)}
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
                <label className="font-bold" htmlFor="username">{t('status')}</label>
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
                        {formattedOptionTypes(options.gameStatus).map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {t(`common:app-configs.gameConfig.gameStatus.${option.label}`)}
                          </MenuItem>
                        ))}
                      </CustomTextField>
                    )}
                  />
                </FormControl>
              </Box>
            </Box>
          </Box>
          <Box className="flex justify-center mt-4">
            <Typography>{t('publicGame:contact')}</Typography>
          </Box>
        </Box>

      </form>
      <Box className="px-5 py-7">
        {
          games?.map((game: any) => {
            return (
              <Box sx={{
                width: '100%',
                height: 'auto',
                border: '2px solid #e4811c',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                padding: '16px 22px',
                borderRadius: '8px',
                marginBottom: '40px'
              }}>
                <Grid container columns={12} spacing={6}>
                  <Grid size={4}>
                    <img src={AztecImg} alt="" />
                  </Grid>
                  <Grid size={4}>
                    <Typography sx={{ fontWeight: 'bold', marginBottom: '10px' }} variant="h4">{getValueByLang(game.gameName, i18n.language)}</Typography>
                    <Box className="flex justify-between">
                      <Typography sx={{ fontWeight: 'bold' }}>{t('publicGame:volatility')}</Typography>
                      <Typography>{t(`publicGame:${game.volatility}`)}</Typography>
                    </Box>
                    <Box className="flex justify-between">
                      <Typography sx={{ fontWeight: 'bold' }}>{t('publicGame:min-bet-line')}</Typography>
                      <Typography>{game.extraConfig[0]?.minBetPerLine}</Typography>
                    </Box>
                    <Box className="flex justify-between">
                      <Typography sx={{ fontWeight: 'bold' }}>{t('publicGame:min-total-bet')}</Typography>
                      <Typography>{game.minTotalBet}</Typography>
                    </Box>
                    <Box className="flex justify-between">
                      <Typography sx={{ fontWeight: 'bold' }}>{t('publicGame:max-mul-win')}</Typography>
                      <Typography>{game.extraConfig[0]?.maxMulWin}</Typography>
                    </Box>
                    <Box className="flex justify-between">
                      <Typography sx={{ fontWeight: 'bold' }}>{t('publicGame:bet-mul')}</Typography>
                      <Typography>{game.extraConfig[0]?.betMul}</Typography>
                    </Box>
                    <Box className="flex justify-between">
                      <Typography sx={{ fontWeight: 'bold' }}>{t('publicGame:max-total-bet')}</Typography>
                      <Typography>{game.maxTotalBet}</Typography>
                    </Box>
                    <Box className="flex justify-between">
                      <Typography sx={{ fontWeight: 'bold' }}>{t('publicGame:pet-per-line')}</Typography>
                      <Typography>{game.extraConfig[0]?.betPerLine}</Typography>
                    </Box>
                    <Box className="flex justify-between">
                      <Typography sx={{ fontWeight: 'bold' }}>{t('publicGame:total-bet')}</Typography>
                      <Typography>{game.extraConfig[0]?.totalBet}</Typography>
                    </Box>
                  </Grid>

                  <Grid size={4}>
                    <Typography sx={{ fontWeight: 'bold', marginBottom: '10px' }} variant="h4">{"\u200B"}</Typography>
                    <Box className="flex justify-between">
                      <Typography sx={{ fontWeight: 'bold' }}>{t('publicGame:release-date')}</Typography>
                      <Typography>{formatDate(game.releaseDate)}</Typography>
                    </Box>
                    <Box className="flex justify-between">
                      <Typography sx={{ fontWeight: 'bold' }}>{t('publicGame:game-symbol')}</Typography>
                      <Typography>{game.symbol}</Typography>
                    </Box>
                    <Box className="flex justify-between">
                      <Typography sx={{ fontWeight: 'bold' }}>{t('publicGame:rtps')}</Typography>
                      <Typography>{game.rtps[0]}</Typography>
                    </Box>
                    <Box className="flex justify-between">
                      <Typography sx={{ fontWeight: 'bold' }}>{t('publicGame:numeric-id')}</Typography>
                      <Typography>{game.numId}</Typography>
                    </Box>
                    <Box className="flex justify-between">
                      <Typography sx={{ fontWeight: 'bold' }}>{t('publicGame:game-format')}</Typography>
                      <Typography>{game.extraConfig[0]?.gameFormat}</Typography>
                    </Box>
                    <Box className="flex justify-between">
                      <Typography sx={{ fontWeight: 'bold' }}>{t('publicGame:pay-type')}</Typography>
                      <Typography>{game.extraConfig[0]?.payType}</Typography>
                    </Box>
                    <Box className="flex justify-between">
                      <Typography sx={{ fontWeight: 'bold' }}>{t('publicGame:symbol-pays')}</Typography>
                      <Typography>{game.extraConfig[0]?.symbolType}</Typography>
                    </Box>
                    <Box className="flex justify-between">
                      <Typography sx={{ fontWeight: 'bold' }}>{t('publicGame:has-reply')}</Typography>
                      <Typography>{game.extraConfig[0]?.hasReplay ? 'Yes' : 'No'}</Typography>
                    </Box>
                    <Box className="flex justify-between">
                      <Typography sx={{ fontWeight: 'bold' }}>{t('publicGame:has-buy-spins')}</Typography>
                      <Typography>{game.extraConfig[0]?.hasBuySpin ? 'Yes' : 'No'}</Typography>
                    </Box>
                    <Box className="flex justify-between">
                      <Typography sx={{ fontWeight: 'bold' }}>{t('publicGame:has-instant-bonus')}</Typography>
                      <Typography>{game.extraConfig[0]?.hasInstantBonus ? 'Yes' : 'No'}</Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Box className="w-full flex justify-end gap-2 mt-3">
                  <Box sx={{
                    padding: '8px',
                    border: '2px solid #e4811c',
                    borderRadius: '8px',
                    color: '#e4811c',
                    cursor: 'pointer'
                  }}>{t('publicGame:play-demo-game')}</Box>
                  <Box sx={{
                    padding: '8px',
                    border: '2px solid #e4811c',
                    borderRadius: '8px',
                    color: '#e4811c',
                    cursor: 'pointer'

                  }}>{t('publicGame:game-overview')}</Box>
                  <Box sx={{
                    padding: '8px',
                    border: '2px solid #e4811c',
                    borderRadius: '8px',
                    color: 'white',
                    backgroundColor: '#e4811c',
                    cursor: 'pointer'

                  }} onClick={() => navigate(
                    `/game/${game.gameId}`
                  )}>{t('publicGame:see-more')}</Box>
                </Box>
              </Box>
            )
          })
        }

      </Box>
    </Box>
  )
}

export default GameList
