import { Box, styled } from '@mui/material'
import GameDemoAction from './GameDemoAction'
import { IGameDetailProps } from '../types';

const BoxContentStyled = styled(Box)(() => ({
  '& .video-container': {
    borderRadius: '8px',
    overflow: 'hidden',
  },
}));

const GameDemoSection = (props: IGameDetailProps) => {
  const { gameDetail } = props;
  const currentLanguage = "en";
  const [reloadDemo, setReloadDemo] = useState(false);

  return (
    <BoxContentStyled>
      <Box
        sx={{
          padding: '1rem',
        }}
      >
        <Box className="video-container">
          <iframe
            key={`${reloadDemo}`}
            src={gameDetail?.links[0].replace("{lang}", currentLanguage)}
            title="YouTube video player"
            width="100%"
            height="450"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Box>
      </Box>

      <GameDemoAction gameDetail={gameDetail} setReloadDemo={setReloadDemo} />
    </BoxContentStyled>
  )
}

export default GameDemoSection
