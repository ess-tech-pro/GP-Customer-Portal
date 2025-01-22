'use client'

import { Grid2, Stack } from '@mui/material';
import GameDemoSection from './components/GameDemoSection';
import DetailInfoSection from './components/DetailInfoSection';
import BoxMainStyled from './styles';
import GalleryList from './components/GalleryList';

export default function GameDetail() {

  return (
    <BoxMainStyled>
      <Grid2 container columns={12}>
        <Grid2 className="border-right" size={{ xs: 12, lg: 8 }}>
          <GameDemoSection />
          <GalleryList />
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 4 }}>
          <Stack gap={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
            <DetailInfoSection />
          </Stack>
        </Grid2>
      </Grid2>
    </BoxMainStyled>
  )
}
