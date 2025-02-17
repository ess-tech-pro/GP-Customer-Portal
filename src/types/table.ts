import React from "react"
export interface TableColumn<T> {
    field: string
    headerName: string
    width?: number
    minWidth?: number
    editable?: boolean
    flex?: number
    align?: "left" | "right" | "center"
    headerAlign?: "left" | "right" | "center"
    renderCell?: (params: { row: T }) => React.ReactNode
}

export interface TableData {
    id: string | number
    [key: string]: any
}

export interface PaginationParams {
    page: number
    size: number
}

