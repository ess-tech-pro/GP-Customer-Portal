import { Box, styled } from '@mui/material'
import GameDemoAction from './GameDemoAction'

const BoxContentStyled = styled(Box)(() => ({
	'& .video-container': {
		borderRadius: '8px',
		overflow: 'hidden',
	},
}))

const GameDemoSection = () => {
	return (
		<BoxContentStyled>
			<Box
				sx={{
					p: 1,
				}}
			>
				<Box className="video-container">
					<iframe
						src="https://www.youtube.com/embed/PFr6jO_RHb4?si=kXo46VNWVTHYKwwf"
						title="YouTube video player"
						width="100%"
						height="450"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					/>
				</Box>
			</Box>

      <GameDemoAction />
		</BoxContentStyled>
	)
}

export default GameDemoSection
