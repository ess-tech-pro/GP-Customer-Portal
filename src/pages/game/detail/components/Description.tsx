import { Box, Typography } from "@mui/material";
import { memo } from "react";
import DOMPurify from 'dompurify';
import { IGameDetailProps, IMultiLang } from "../types";
import parse from 'react-html-parser';

const Description = (props: IGameDetailProps) => {
  const { gameDetail } = props;
  const currentLanguage = 'vi';

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
  // const [detailData, setDetailData] = useState<IGameDetail | null>(null);

  // I need check currentLanguage here
  // useEffect(() => {
  //   if (!gameDetail) return;

  //   // const name = gameDetail.gameName.find((item) => item.lang === currentLanguage);
  //   setDetailData({
  //     ...gameDetail,
  //     gameName: gameDetail.gameName.find((item) => item.lang === currentLanguage),
  //     description: gameDetail.description.find((item) => item.lang === currentLanguage),
  //   });
  // }, [currentLanguage]);


  console.log('gameName:', getGameName(gameDetail.gameName));

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
      {/* <Box>
        {
          getDescription(gameDetail.description)
        }
      </Box> */}
    </Box>
  );
};

export default memo(Description);
