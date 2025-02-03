import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';

function Home() {
  const { t } = useTranslation();

  return <Typography variant='h1'>{t('welcome')}</Typography>;
}

export default Home;
