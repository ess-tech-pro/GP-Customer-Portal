import { Box, Typography } from "@mui/material";
import { memo } from "react";
import { IGameDetailProps } from "../types";

const Description = (props: IGameDetailProps) => {
  const { gameDetail } = props;

  console.log('Game detail:', gameDetail);

  return (
    <Box sx={{
      backgroundColor: 'white',
      padding: '1rem',
    }}>
      <Typography variant="h1" sx={{
        fontSize: '32px',
        fontWeight: '600',
        marginBottom: '0.5rem',
        lineHeight: 1,
      }}>
        {gameDetail.name}
      </Typography>
      <Box>
        {gameDetail.description}
      </Box>
    </Box>
  );
};

export default memo(Description);
