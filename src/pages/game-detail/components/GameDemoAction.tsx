import { Box, Button, Stack } from '@mui/material'
import LaunchIcon from '@mui/icons-material/Launch'
import FilterNoneIcon from '@mui/icons-material/FilterNone'
import SelectCurrency from './SelectCurrency'
import SelectLanguage from './SelectLanguage'
import ButtonReload from './ButtonReload'
import { IGameDetailProps } from '../types'

interface IRenderButtonProps {
  icon: ReactNode;
  onClick: () => void;
}

interface IGameDetailActionProps {
  gameDetail: IGameDetailProps['gameDetail'];
  setReloadDemo: (value: boolean | ((prev: boolean) => boolean)) => void;
}

const RenderButton = ({ icon, onClick }: IRenderButtonProps) => {
  return (
    <Button
      onClick={onClick}
      variant='text'
      sx={{
        border: '2px solid #ff9801',
        borderRadius: '10px',
        minWidth: '55px',
        padding: '4px 6px',
        '& svg': {
          color: '#ff9801',
        }
      }}>
      {icon}
    </Button>
  )
};

const GameDemoAction = (
  props: IGameDetailActionProps
) => {
  const { gameDetail, setReloadDemo } = props;
  const currentLanguage = 'en';

  const handleOpenGameDetail = () => {
    const url = gameDetail?.links[0].replace("{lang}", currentLanguage)
    window.open(url, '_blank');
  };

  const handleReloadDemo = () => {
    setReloadDemo(
      (prev) => !prev
    );
  };

  return (
    gameDetail.gameId && (
      <Stack direction={{
        sm: 'column',
        md: 'row',
      }} gap={2} alignItems='center' sx={{
        padding: '0 2rem',
      }}>
        <Box sx={{ flexGrow: 1, width: '100%' }}>
          <SelectCurrency />
        </Box>
        <Box sx={{ flexGrow: 1, width: '100%' }}>
          <SelectLanguage />
        </Box>

        <Stack direction="row" gap={2} alignItems='center'>
          {/* Button Reload */}
          <ButtonReload onClick={handleReloadDemo} />

          {/* Button Launch Game */}
          <RenderButton icon={<LaunchIcon />} onClick={handleOpenGameDetail} />

          {/* Button filter */}
          <RenderButton icon={<FilterNoneIcon />} onClick={() => console.log('Filter')} />
        </Stack>

      </Stack>
    )
  )
}

export default GameDemoAction
