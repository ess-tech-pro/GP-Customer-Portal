import { Box, styled } from "@mui/material";

const BoxMainStyled = styled(Box)(() => ({
  backgroundColor: 'white',
  '& .border-right': {
    borderRight: '1px solid #e0e0e0',
    '@media (max-width: 960px)': {
      borderRight: 'none',
    },
  },
}));

export default BoxMainStyled;
