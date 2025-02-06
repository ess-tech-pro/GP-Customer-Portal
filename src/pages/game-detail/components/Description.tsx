import { Box, Typography } from "@mui/material";
import { memo } from "react";
import DOMPurify from 'dompurify';
import { IGameDetailProps, IMultiLang } from "../types";
import parse from 'react-html-parser';

const Description = (props: IGameDetailProps) => {
  const { gameDetail } = props;
  const currentLanguage = 'en';

  const getGameName = (gameName: IMultiLang<string> | IMultiLang<string>[]): string => {
    if (Array.isArray(gameName)) {
      return gameName.find((item) => item.lang === currentLanguage)?.value || '';
    }
    return gameName.value;
  };

  const getDescription = (description: IMultiLang<string> | IMultiLang<string>[]): string => {
    if (Array.isArray(description)) {
      return description.find((item) => item.lang === currentLanguage)?.value || '';
    }
    return description.value;
  };

  const sanitizedDescription = DOMPurify.sanitize(getDescription(gameDetail.description));

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
        {getGameName(gameDetail.gameName)}
      </Typography>
      <Box>
        {parse(sanitizedDescription)}
      </Box>
    </Box>
  );
};

export default memo(Description);
