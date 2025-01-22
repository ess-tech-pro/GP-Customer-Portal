import { Computer, Smartphone, Square, Tablet } from "@mui/icons-material";
import { Button, Grid2, List, ListItem, ListItemIcon, ListItemText, styled, Typography } from "@mui/material";
import { Box } from "@mui/system";

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

const GameDetails = () => {
  const [isShowMiniMode, setIsShowMiniMode] = useState(false)
  const data = useMemo(() => ([
    {
      "title": "Release Date",
      "type": "text",
      "value": "2nd January 2025"
    },
    {
      "title": "Game Symbol",
      "type": "text",
      "value": "vs20plsmcannon"
    },
    {
      "title": "Numeric ID",
      "type": "text",
      "value": "1683039673"
    },
    {
      "title": "Minimum Bet Per Line",
      "type": "text",
      "value": "0.01"
    },
    {
      "title": "Minimum Total Bet",
      "type": "text",
      "value": "0.2"
    },
    {
      "title": "Maximum Total Bet",
      "type": "text",
      "value": "240"
    },
    {
      "title": "Reels",
      "type": "text",
      "value": "7"
    },
    {
      "title": "Rows",
      "type": "text",
      "value": "7"
    },
    {
      "title": "Pay Type",
      "type": "text",
      "value": "Cluster Pays"
    },
    {
      "title": "Symbol Pays",
      "type": "text",
      "value": "5+"
    },
    {
      "title": "Bet Multiplier",
      "type": "text",
      "value": "20"
    },
    {
      "title": "Max Multiplier Win",
      "type": "text",
      "value": "9000"
    },
    {
      "title": "RTPs",
      "type": "list",
      "value": [
        "96.52%"
      ]
    },
    {
      "title": "Hit Frequency",
      "type": "list",
      "value": [
        "Base game hit frequency 1 in 3.28",
        "Free spins hit frequency 1 in 278",
        "Odds for > x1000.00 hit frequency 1 in 33,100",
        "Max win hit frequency 1 in 3,100,000"
      ]
    },
    {
      "title": "Volatility",
      "type": "text",
      "value": "Very High"
    },
    {
      "title": "Available On",
      "type": "icon",
      "value": [<Computer />, <Smartphone />, <Tablet />]
    },
    {
      "title": "Has Replay",
      "type": "text",
      "value": "Yes"
    },
    {
      "title": "Has Buy Spins",
      "type": "text",
      "value": "Yes"
    }
  ]
  ), [])

  const DetailInfoList = useMemo(() => {
    return data.map((item) => (
      <Grid2 container columnSpacing={2} rowSpacing={1} key={item.title} size={12}>
        <Grid2 size={6}>
          <Typography color="#000" fontWeight={600}>
            {item.title}
          </Typography>
        </Grid2>
        {
          (
            item.type === 'text' && <Grid2 size={6}>
              <Typography textAlign="right" >{item.value}</Typography>
            </Grid2>
          ) ||
          (
            item.type === 'icon' && typeof item.value === 'object' && <Grid2 size={6}>
              <Typography textAlign="right" display="flex" gap={1} justifyContent='flex-end' color="#f09020">
                {
                  item.value
                }
              </Typography>
            </Grid2>
          ) ||
          (
            item.type === 'list' &&
            typeof item.value === 'object' &&
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
          )
        }
      </Grid2>
    ))
  }, [data])

  return (
    <Grid2 container sx={{ padding: '16px' }} gap={2}>
      <Grid2 container columnSpacing={2} rowSpacing={1} size={12}>
        <Grid2 size={12}>
          <Grid2 container size={12} justifyContent='space-between' alignItems='center'>
            <Typography component='span' color="#000" fontWeight={600}>
              Mini mode
            </Typography>
            <OrangeButtonStyled onClick={() => setIsShowMiniMode(true)}>
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
              paddingBottom: 'calc(9/16 * 100%)'
            }}>
              <iframe
                src="https://www.youtube.com/embed/PFr6jO_RHb4?si=kXo46VNWVTHYKwwf"
                title="YouTube video player"
                width="100%"
                height="100%"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%'
                }}
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
