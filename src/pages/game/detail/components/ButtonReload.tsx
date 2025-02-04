import { Button } from '@mui/material'
import { memo } from 'react'

const ButtonReload = ({
  onClick,
}: {
  onClick: () => void
}) => {

  return (
    <Button variant="contained" sx={{
      backgroundColor: '#ff9801',
      borderRadius: '10px',
      padding: '4px 6px',
      textTransform: 'none',
      minWidth: '110px',
      minHeight: '36px',
      boxShadow: 'none',
      '&:hover, &:focus': {
        boxShadow: 'none',
      }
    }} onClick={onClick}>
      Reload demo
    </Button>
  )
}

export default memo(ButtonReload)
