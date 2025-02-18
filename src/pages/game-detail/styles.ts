import { Box, styled } from '@mui/material'

const BoxMainStyled = styled(Box)(({ theme }) => ({
  backgroundColor: 'white',
  padding: '16px',
  '& .border-right': {
    borderRight: '1px solid #e0e0e0',
    [theme.breakpoints.down('md')]: {
      borderRight: 'none',
    },
    [theme.breakpoints.down('sm')]: {
      borderRight: '1px solid #e0e0e0',
    },
  },
}))

export default BoxMainStyled
