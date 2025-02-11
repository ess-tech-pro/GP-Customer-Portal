import ReactDOM from 'react-dom/client';
import { AppRouter } from '@/routes/AppRouter';
import './i18n';
import './styles/global.css';
import Providers from '@/components/Providers';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Providers>
    <AppRouter />
  </Providers>,
);
