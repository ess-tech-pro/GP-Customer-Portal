import { getGameList, getOptions } from "@/store/slices/gameSlice";
import { AppDispatch } from "@/store/store";
import { Box, Typography } from "@mui/material"
import Grid from '@mui/material/Grid2';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getValueByLang } from '@/utils/utils';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const GameList = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [options, setOptions] = useState<any>({});
  const [filters, setFilters] = useState({
    gameCategories: 'slot',
    gameCurrencies: 'thb',
    gameLangs: 'en',
    gameStatus: '0',
    gameTags: 'EVENT',
    jackpots: 'JACKPOT',
    volatilities: 'HIGH',
    rtps: '99'
  })


  const fetchGameList = async () => {
    const { payload } = await dispatch(getGameList({ gameStatus: 2 }))
    setGames(payload.data.data)
  }

  const fetchOptions = async () => {
    const { payload } = await dispatch(getOptions())
    setOptions(payload)
  }

  useEffect(() => {
    fetchGameList()
    fetchOptions()
  }, [])

  return (
    <Grid container columns={12}>
      <Grid size={12}>
        <FormControl sx={{ marginRight: 2, marginBottom: 2, minWidth: '150px' }}>
          <InputLabel id="demo-simple-select-label">Categories</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filters.gameCategories}
            label="Categories"
            onChange={(event) => setFilters({ ...filters, gameCategories: event.target.value })}          >
            {
              options?.gameCategories?.map((category: string) => {
                return <MenuItem key={category} value={category}>{category}</MenuItem>
              })
            }
          </Select>
        </FormControl>

        <FormControl sx={{ marginRight: 2, marginBottom: 2, minWidth: '150px' }}>
          <InputLabel id="demo-simple-select-label2">Currencies</InputLabel>
          <Select
            labelId="demo-simple-select-label2"
            id="demo-simple-select2"
            value={filters.gameCurrencies}
            label="Categories"
            onChange={(event) => setFilters({ ...filters, gameCurrencies: event.target.value })}          >
            {
              Object.keys(options.gameCurrencies ?? {}).map((key) => (
                <MenuItem key={key} value={options.gameCurrencies[key]}>{key}</MenuItem>
              ))
            }
          </Select>
        </FormControl>

        <FormControl sx={{ marginRight: 2, marginBottom: 2, minWidth: '150px' }}>
          <InputLabel id="demo-simple-select-label3">Lang</InputLabel>
          <Select
            labelId="demo-simple-select-label3"
            id="demo-simple-select3"
            value={filters.gameLangs}
            label="Lang"
            onChange={(event) => setFilters({ ...filters, gameLangs: event.target.value })}          >
            {
              Object.keys(options.gameLangs ?? {}).map((key) => (
                <MenuItem key={key} value={options.gameLangs[key]}>{key}</MenuItem>
              ))
            }
          </Select>
        </FormControl>

        <FormControl sx={{ marginRight: 2, marginBottom: 2, minWidth: '150px' }}>
          <InputLabel id="demo-simple-select-label4">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label4"
            id="demo-simple-select4"
            value={filters.gameStatus}
            label="Lang"
            onChange={(event) => setFilters({ ...filters, gameStatus: event.target.value })}          >
            {
              Object.keys(options.gameStatus ?? {}).map((key) => (
                <MenuItem key={key} value={options.gameStatus[key]}>{key}</MenuItem>
              ))
            }
          </Select>
        </FormControl>

        <FormControl sx={{ marginRight: 2, marginBottom: 2, minWidth: '150px' }}>
          <InputLabel id="demo-simple-select-label5">Tags</InputLabel>
          <Select
            labelId="demo-simple-select-label5"
            id="demo-simple-select5"
            value={filters.gameTags}
            label="Lang"
            onChange={(event) => setFilters({ ...filters, gameTags: event.target.value })}          >
            {
              Object.keys(options.gameTags ?? {}).map((key) => (
                <MenuItem key={key} value={options.gameTags[key]}>{key}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
        <FormControl sx={{ marginRight: 2, marginBottom: 2, minWidth: '150px' }}>
          <InputLabel id="demo-simple-select-label6">jackpots</InputLabel>
          <Select
            labelId="demo-simple-select-label6"
            id="demo-simple-select6"
            value={filters.jackpots}
            label="Lang"
            onChange={(event) => setFilters({ ...filters, jackpots: event.target.value })}          >
            {
              Object.keys(options.jackpots ?? {}).map((key) => (
                <MenuItem key={key} value={options.jackpots[key]}>{key}</MenuItem>
              ))
            }
          </Select>
        </FormControl>

        <FormControl sx={{ marginRight: 2, marginBottom: 2, minWidth: '150px' }}>
          <InputLabel id="demo-simple-select-label7">volatilities</InputLabel>
          <Select
            labelId="demo-simple-select-label7"
            id="demo-simple-select7"
            value={filters.volatilities}
            label="Lang"
            onChange={(event) => setFilters({ ...filters, volatilities: event.target.value })}          >
            {
              Object.keys(options.volatilities ?? {}).map((key) => (
                <MenuItem key={key} value={options.volatilities[key]}>{key}</MenuItem>
              ))
            }
          </Select>
        </FormControl>

        <FormControl sx={{ marginRight: 2, marginBottom: 2, minWidth: '150px' }}>
          <InputLabel id="demo-simple-select-label10">rtps</InputLabel>
          <Select
            labelId="demo-simple-select-label10"
            id="demo-simple-select10"
            value={filters.rtps}
            label="Categories"
            onChange={(event) => setFilters({ ...filters, rtps: event.target.value })}          >
            {
              options?.rtps?.map((category: string) => {
                return <MenuItem key={category} value={category}>{category}</MenuItem>
              })
            }
          </Select>
        </FormControl>

      </Grid>
      <Box>
        <Typography variant="h3">{t('gameList')}</Typography>
      </Box>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4">
        {games.map((game: any) => (
          <div
            key={game.gameId}
            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            {/* <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="w-full h-48 object-cover"
                        /> */}
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-800">
                {
                  getValueByLang(game.gameName, i18n.language)
                }
              </h3>
              <div className="text-gray-600 mt-2" dangerouslySetInnerHTML={{ __html: getValueByLang(game.description, i18n.language) }} />

              <button onClick={() => navigate(
                `/game/${game.gameId}`
              )} className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors duration-300">
                Play
              </button>
            </div>
          </div>
        ))}
      </div>
    </Grid>
  )
}

export default GameList
