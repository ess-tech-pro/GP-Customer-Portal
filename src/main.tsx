import ReactDOM from 'react-dom/client';
import App from './App';
import './i18n';
import './styles/global.css';
import { ToastContainer } from 'react-toastify';
import Providers from '@/components/Providers';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Providers>
    <ToastContainer />
    <App />
  </Providers>,
);
