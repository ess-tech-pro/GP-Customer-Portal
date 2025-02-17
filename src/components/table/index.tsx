import type React from "react"

import { useState } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Paper,
} from "@mui/material"
import type { BaseItem, CustomTableProps } from "@/types/table"
import { Loading } from "../common/Loading";
import NoData from "../common/NoData";


const CustomTable = <T extends BaseItem,>({
    columns,
    data,
    pageSize = 10,
    totalRows,
    isLoading = false,
    pageSizeOption = [10, 25, 50],
    onPageChange,
}: CustomTableProps<T>) => {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(pageSize)

    const handleChangePage = async (_event: unknown, newPage: number) => {
        setPage(newPage)
        await onPageChange({
            page: newPage,
            size: rowsPerPage,
        })
    }

    const handleChangeRowsPerPage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRowsPerPage = Number.parseInt(event.target.value, 10)
        setRowsPerPage(newRowsPerPage)
        setPage(0)
        await onPageChange({
            page: 0,
            size: newRowsPerPage,
        })
    }

    return (
        <Paper elevation={2}>
            <TableContainer>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.field}
                                    align={column.headerAlign || "left"}
                                    style={{
                                        minWidth: column.minWidth,
                                        width: column.width,
                                        flex: column.flex,
                                    }}
                                    sx={{
                                        backgroundColor: "primary.main",
                                        color: "primary.contrastText",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {column.headerName}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} align="center" sx={{ py: 8 }}>
                                    <Loading isLoading={isLoading} />
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={columns.length} align="center" sx={{ py: 8 }}>
                                        <NoData message="No Data" />
                                    </TableCell>
                                </TableRow>
                            ) :
                                data.map((row: T) => (
                                    <TableRow hover key={row.id}>
                                        {columns.map((column) => (
                                            <TableCell key={column.field} align={column.align || "left"}>
                                                {column.renderCell ? column.renderCell({ row }) : row[column.field]}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                page={page}
                component="div"
                count={totalRows}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={pageSizeOption}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )
}

export default CustomTable