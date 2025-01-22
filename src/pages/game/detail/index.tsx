'use client'

import { Stack } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Description from './components/Description';
import DetailInfoSection from './components/DetailInfoSection';
import GalleryList from './components/GalleryList'
import GameDemoSection from './components/GameDemoSection';
import { BoxMainStyled } from './styles';
import { IGameDetail } from './types';

const GameDetail = () => {
  // I need fake data gameDetail here
  const gameDetail: IGameDetail = {
    id: '1',
    name: 'Aztec Smash',
    image: 'https://via.placeholder.com/300',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat ligula. Ut sodales enim at nisi tempor, quis luctus enim tempus. Nullam auctor, nunc nec ultricies bibendum, nunc dui fermentum nunc, nec tincidunt nunc turpis a libero. Nulla facilisi. Sed nec purus euismod, ultricies mi eget, ultricies turpis. Donec nec nunc sit amet urna aliquam lacinia. Nulla nec purus feugiat ligula. Ut sodales enim at nisi tempor, quis luctus enim tempus. Nullam auctor, nunc nec ultricies bibendum, nunc dui fermentum nunc, nec tincidunt nunc turpis a libero. Nulla facilisi. Sed nec purus euismod, ultricies mi eget, ultricies turpis. Donec nec nunc sit amet urna aliquam lacinia.',
    rating: 4,
    tags: ['action', 'adventure'],
  };

  return (
    <BoxMainStyled>
      <Grid container columns={12}>
        <Grid className="border-right" size={{ xs: 12, lg: 8 }}>
          <GameDemoSection gameDetail={gameDetail} />
          <Description gameDetail={gameDetail} />
          <GalleryList />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack gap={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
            <DetailInfoSection />
          </Stack>
        </Grid>
      </Grid>
    </BoxMainStyled>
  )
}

export default GameDetail;
