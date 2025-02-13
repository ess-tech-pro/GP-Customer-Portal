// Third-party Imports
import { Provider } from 'react-redux'

import { store } from '@/store/store'
import type { ChildrenType } from '@/types/base';

const ReduxProvider = ({ children }: ChildrenType) => {
  return <Provider store={store}>{children}</Provider>
}

export default ReduxProvider
