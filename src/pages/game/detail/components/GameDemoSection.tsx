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


  console.log('Game detail', gameDetail);
  return (
    <BoxContentStyled>
      <Box
        sx={{
          padding: '1rem',
        }}
      >
        <Box className="video-container">
          <iframe
            src="https://www.youtube.com/embed/PFr6jO_RHb4?si=kXo46VNWVTHYKwwf"
            title="YouTube video player"
            width="100%"
            height="450"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Box>
      </Box>

      <GameDemoAction gameDetail={gameDetail} />
    </BoxContentStyled>
  )
}

export default GameDemoSection
