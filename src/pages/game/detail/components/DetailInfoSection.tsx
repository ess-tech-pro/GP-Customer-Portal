import { Computer, Smartphone, Square } from "@mui/icons-material";
import { Grid2, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { Box } from "@mui/system";

const GameDetails = () => {
  const data = useMemo(() => ([
    {
      "title": "Mini Mode",
      "type": "video",
      "value": "https://www.youtube.com/embed/PFr6jO_RHb4?si=kXo46VNWVTHYKwwf"
    },
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
      "value": [<Computer />, <Smartphone />]
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
          <Typography color="text.secondary" fontWeight={600}>
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
          ) ||
          (
            item.type === 'video' &&
            typeof item.value === 'string' &&
            <Grid2 size={12}>
              <Box sx={{
                position: 'relative',
                width: '100%',
                paddingBottom: 'calc(9/16 * 100%)'
              }}>
                <iframe
                  src={item.value}
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
          )
        }
      </Grid2>
    ))
  }, [data])

  return (
    <Grid2 container sx={{ padding: '16px' }} gap={2}>
      {DetailInfoList}
    </Grid2>
  );
};

export default GameDetails;
