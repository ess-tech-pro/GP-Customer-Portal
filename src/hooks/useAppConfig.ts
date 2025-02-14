import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchAppConfig } from '../store/slices/appConfigSlice';

export const useAppConfig = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.appConfig);

  const loadConfig = () => {
    dispatch(fetchAppConfig());
  };

  return {
    config: data,
    loadConfig,
  };
};
