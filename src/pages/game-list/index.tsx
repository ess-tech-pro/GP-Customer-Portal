import { getGameList } from "@/store/slices/gameSlice";
import { AppDispatch } from "@/store/store";
import { Box, Typography } from "@mui/material"
import Grid from '@mui/material/Grid2';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getValueByLang } from '@/utils/getValueByLang';

const GameList = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [games, setGames] = useState([]);

  const fetchGameList = async () => {
    const { payload } = await dispatch(getGameList({}))
    setGames(payload.data.data)
  }

  useEffect(() => {
    fetchGameList()
  }, [])

  return (
    <Grid container columns={12}>
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
              <p className="text-gray-600 mt-2">
                <div dangerouslySetInnerHTML={{ __html: getValueByLang(game.description, i18n.language) }} />
              </p>

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
