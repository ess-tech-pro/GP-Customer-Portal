import { RootState } from '@/store/store';
import { ReactElement } from 'react'
import { useSelector } from 'react-redux';

interface Props {
  modules: string,
  children: ReactElement,
}

/**
 * Check Permission Component
 * @param param
 * @returns
 */
export default function PermissionComponent({ modules, children }: Props) {
  const { user } = useSelector((state: RootState) => state.user); //  
  const isExist = Object.keys(user?.permissions || {}).some((key) => {
    return modules?.includes(key) && user.permissions[key];
  });

  if (isExist) {
    return children as ReactElement;
  }
}
