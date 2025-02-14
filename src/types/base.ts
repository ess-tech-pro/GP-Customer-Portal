// React Imports
import type { ReactNode } from 'react'

export type ChildrenType = {
  children: ReactNode
}

export type SystemMode = 'light' | 'dark'


export type ApiListResponsePaging = {
  from: number,
  size: number,
  total: number
}


export type IApiListResponse_Data<T> = {
  data: T[]
  paging: ApiListResponsePaging
}


export type TableColumn<T> = {
  field: string,
  headerName: string,
  width?: number,
  minWidth?: number,
  editable?: boolean,
  flex?: number,
  align?: string,
  type?: string,
  sortable?: boolean,
  headerAlign?: string,
  renderCell?: (row: T) => ReactNode
}