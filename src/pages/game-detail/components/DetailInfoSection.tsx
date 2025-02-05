import { Computer, Smartphone, Square, Tablet } from "@mui/icons-material";
import { Button, Grid2, List, ListItem, ListItemIcon, ListItemText, styled, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { IGameDetailProps } from "../types";
import moment from "moment";
import { GAME_DETAIL_VOLATILITY } from "../constants";

const OrangeButtonStyled = styled(Button)(() => ({
  backgroundColor: '#ff9801',
  borderRadius: '10px',
  padding: '4px 6px',
  textTransform: 'none',
  minWidth: '110px',
  minHeight: '36px',
  boxShadow: 'none',
  color: '#fff',
  '&:hover, &:focus': {
    boxShadow: 'none',
  }
}));

const GameDetails = (props: IGameDetailProps) => {
  const { gameDetail } = props;
  const [isShowMiniMode, setIsShowMiniMode] = useState(false)
  const currentLanguage = "en";

  const DRIVE_ICONS = {
    MOBILE: <Smartphone />,
    DESKTOP: <Computer />,
    TABLET: <Tablet />,
  };

  const getDriveIcons = (drives: string[]) => {
    return drives.map(drive => DRIVE_ICONS[drive]);
  };

  const data = useMemo(() => {
    const extraConfigData = gameDetail.extraConfig[0];

    return [
      {
        "title": "Release Date",
        "type": "text",
        "value": moment(gameDetail.timeRunning).format('Do MMMM YYYY')
      },
      {
        "title": "Game Symbol",
        "type": "text",
        "value": gameDetail?.symbol
      },
      {
        "title": "Numeric ID",
        "type": "text",
        "value": gameDetail?.numId
      },
      {
        "title": "Minimum Bet Per Line",
        "type": "text",
        "value": extraConfigData?.minBetPerLine
      },
      {
        "title": "Minimum Total Bet",
        "type": "text",
        "value": extraConfigData?.totalBet
      },
      {
        "title": "Maximum Total Bet",
        "type": "text",
        "value": extraConfigData?.totalBet
      },
      {
        "title": "Reels",
        "type": "text",
        "value": extraConfigData?.reel
      },
      {
        "title": "Rows",
        "type": "text",
        "value": extraConfigData?.rows
      },
      {
        "title": "Pay Type",
        "type": "text",
        "value": extraConfigData?.type
      },
      {
        "title": "Symbol Pays",
        "type": "text",
        "value": extraConfigData?.symbolType
      },
      {
        "title": "Bet Multiplier",
        "type": "text",
        "value": extraConfigData?.betMul
      },
      {
        "title": "Max Multiplier Win",
        "type": "text",
        "value": extraConfigData?.maxMulWin
      },
      {
        'key': 'rtps',
        "title": "RTPs",
        "type": "list",
        "value": gameDetail?.rtps.map((rtp) => `${rtp}%`)
      },
      {
        "title": "Hit Frequency",
        "type": "list",
        "value": extraConfigData?.hitFrequency
      },
      {
        "title": "Volatility",
        "type": "text",
        "value": GAME_DETAIL_VOLATILITY[gameDetail?.volatility]
      },
      {
        "title": "Available On",
        "type": "icon",
        "value": getDriveIcons(gameDetail?.drives)
      },
      {
        "title": "Has Replay",
        "type": "text",
        "value": extraConfigData.hasReplay ? 'Yes' : 'No'
      },
      {
        "title": "Has Buy Spins",
        "type": "text",
        "value": extraConfigData.hasBuySpin ? 'Yes' : 'No'
      }
    ]
  }, []);


  const DetailInfoList = useMemo(() => {

    const renderTextItem = (item) => (
      <Grid2 size={6}>
        <Typography textAlign="right">{item.value}</Typography>
      </Grid2>
    );

    const renderIconItem = (item) => (
      <Grid2 size={6}>
        <Typography textAlign="right" display="flex" gap={1} justifyContent="flex-end" color="#f09020">
          {item.value}
        </Typography>
      </Grid2>
    );

    const renderListItem = (item) => (
      <Grid2 size={12}>
        <List disablePadding>
          {item.value.map((value) => (
            <ListItem key={value} alignItems="flex-start" disablePadding>
              <ListItemIcon sx={{ minWidth: '24px', marginTop: '11px' }}>
                <Square sx={{ color: '#f09020', fontSize: '10px' }} />
              </ListItemIcon>
              <ListItemText>{value}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Grid2>
    );

    return data.map((item) => (
      <Grid2 container columnSpacing={2} rowSpacing={1} key={item.title} size={12}>
        <Grid2 size={6}>
          <Typography color="#000" fontWeight={600}>
            {item.title}
          </Typography>
        </Grid2>
        {item.type === 'text' && renderTextItem(item)}
        {item.type === 'icon' && typeof item.value === 'object' && renderIconItem(item)}
        {item.type === 'list' && typeof item.value === 'object' && renderListItem(item)}
      </Grid2>
    ));
  }, [data]);

  return (
    <Grid2 container sx={{ padding: '16px' }} gap={2}>
      <Grid2 container columnSpacing={2} rowSpacing={1} size={12}>
        <Grid2 size={12}>
          <Grid2 container size={12} justifyContent='space-between' alignItems='center'>
            <Typography component='span' color="#000" fontWeight={600}>
              Mini mode
            </Typography>
            <OrangeButtonStyled onClick={() => setIsShowMiniMode(
              !isShowMiniMode
            )}>
              Launch
            </OrangeButtonStyled>
          </Grid2>
        </Grid2>
        {
          isShowMiniMode &&
          <Grid2 size={12} marginTop={2}>
            <Box sx={{
              position: 'relative',
              width: '100%',
            }}>
              <iframe
                src={gameDetail?.links[0].replace("{lang}", currentLanguage)}
                title="YouTube video player"
                width="100%"
                height="200"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </Box>
          </Grid2>
        }
      </Grid2>
      {DetailInfoList}
      <Grid2 container columnSpacing={2} rowSpacing={1} size={12}>
        <Typography variant="h5" fontWeight={600} marginBottom={1}>
          Downloads
        </Typography>

        <Grid2 container size={12} justifyContent='space-between' alignItems='center'>
          <Typography component="span">
            Game Overview
          </Typography>
          <OrangeButtonStyled onClick={() => setIsShowMiniMode(true)}>
            Download
          </OrangeButtonStyled>
        </Grid2>

        <Grid2 container size={12} justifyContent='space-between' alignItems='center'>
          <Typography component="span">
            Media Pack
          </Typography>
          <OrangeButtonStyled onClick={() => setIsShowMiniMode(true)}>
            Download
          </OrangeButtonStyled>
        </Grid2>

        <Grid2 container size={12} justifyContent='space-between' alignItems='center'>
          <Typography component="span">
            Game Data (XLSX)
          </Typography>
          <OrangeButtonStyled onClick={() => setIsShowMiniMode(true)}>
            Download
          </OrangeButtonStyled>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default GameDetails;
