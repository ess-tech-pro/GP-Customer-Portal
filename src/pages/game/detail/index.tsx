'use client'

import { Stack } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Description from './components/Description';
import DetailInfoSection from './components/DetailInfoSection';
import GalleryList from './components/GalleryList'
import GameDemoSection from './components/GameDemoSection';
import { IGalleryItem, IGameDetail } from './types';
import BoxMainStyled from './styles';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { getGameDetail } from '@/store/slices/gameSlice';

const GameDetail = () => {
  const gameId = '0000';
  const dispatch = useDispatch<AppDispatch>();
  const [gameDetail, setGameDetail] = useState<IGameDetail | null>(null);
  const [galleryList, setGalleryList] = useState<IGalleryItem[]>();

  const fetchData = async ({
    id
  }) => {
    dispatch(
      getGameDetail({
        id,
      }),
    )
      .unwrap() // unwrap giúp bắt lỗi reject
      .then((data) => {
        if (data) {
          setGameDetail(data);
          const galleryData: IGalleryItem[] = data.videoRef.map((item: string, index: number) => ({
            id: index + 1,
            title: `Item ${index + 1}`,
            value: item,
          }));

          setGalleryList(galleryData);
        }
      })
      .catch((err) => {
        console.error('Login failed:', err); // Có thể log lỗi nếu cần
      });
  };

  useEffect(() => {
    fetchData({
      id: gameId,
    });
  }, [gameId]);

  return (
    <BoxMainStyled>
      <Grid container columns={12}>
        <Grid className="border-right" size={{ xs: 12, lg: 8 }}>
          {
            gameDetail && (
              <>
                <GameDemoSection gameDetail={gameDetail} />
                <Description gameDetail={gameDetail} />

              </>
            )
          }

          {
            galleryList && (
              <GalleryList galleryList={galleryList} />
            )
          }
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack gap={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
            {
              gameDetail && (
                <DetailInfoSection gameDetail={gameDetail} />
              )
            }

          </Stack>
        </Grid>
      </Grid>
    </BoxMainStyled>
  )
}

export default GameDetail;
