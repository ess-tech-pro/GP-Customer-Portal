import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './i18n';
import { store } from './store/store';
import './styles/global.css';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <ToastContainer />
    <App />
  </Provider>,
);
