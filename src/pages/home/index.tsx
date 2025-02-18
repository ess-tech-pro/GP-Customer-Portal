import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import { ROUTE_PATH } from '@/constants/routing';
import { AppDispatch } from '@/store/store';
import { useDispatch } from 'react-redux';
import { setBreadcrumbs } from '@/store/slices/breadcrumbsSlice';

function Home() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(
      setBreadcrumbs({
        links: [
          { name: t('home'), href: ROUTE_PATH.HOME }
        ]
      }));
  }, [t]);

  return <Typography variant='h1'>{t('welcome')}</Typography>;
}

export default Home;
