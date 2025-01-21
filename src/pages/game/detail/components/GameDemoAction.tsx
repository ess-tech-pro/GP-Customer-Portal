import { Button, Stack, styled } from '@mui/material'
import LaunchIcon from '@mui/icons-material/Launch'
import FilterNoneIcon from '@mui/icons-material/FilterNone'
import SelectCurrency from './SelectCurrency'
import SelectLanguage from './SelectLanguage'
import ButtonReload from './ButtonReload'

const BoxActionStyled = styled(Stack)(() => ({}));

interface RenderButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
}

const RenderButton = ({icon, onClick}: RenderButtonProps) => {
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

const GameDemoAction = () => {
	return (
		<BoxActionStyled direction="row" gap={2} alignItems='center'>
			<SelectCurrency />
			<SelectLanguage />

			{/* Button Reload */}
			<ButtonReload />

			{/* Button Launch Game */}
      <RenderButton icon={<LaunchIcon />} onClick={() => console.log('Launch Game')} />

			{/* Button filter */}
      <RenderButton icon={<FilterNoneIcon />} onClick={() => console.log('Filter')} />

		</BoxActionStyled>
	)
}

export default GameDemoAction
