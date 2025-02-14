import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    CircularProgress,
} from '@mui/material';

import Pagination from './Pagination'

const LoadingOverlay = () => (
    <Box
        className="min-h-[300px] w-full h-full flex justify-center items-center"
    >
        <CircularProgress />
    </Box>
);

const NoDataOverlay = () => (
    <Box
        className="w-full h-full min-h-[300px] flex justify-center items-center flex-col"
    >
        <p className="text-[14px] text-[--color-grey] mt-2 text-center">
            No Data
        </p>
    </Box>
);

const TableComponent = ({
    columns,
    data,
    isLoading,
    page,
    turnOffOver = false,
    hasNewMobileTable = false,
    hiddenPagination = false,
    handleGetCurrentPage,
    hasNextPage,
    hasPreviousPage,
}: any) => {
    return (
        <div className="scroll-custom">
            <div>
                <div
                    className={`${turnOffOver ? '' : 'overflow-x-auto min-h-[300px]'} 
            Table mt-[20px] ${hasNewMobileTable ? 'hidden md:block' : ''}`}
                >
                    {isLoading && <LoadingOverlay />}
                    {!isLoading && !!data?.length && (
                        <Paper>
                            <TableContainer >
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            {columns?.map((column) => (
                                                <TableCell key={`TABLE_CELL:${column.headerAlign}`} align={column.headerAlign}>
                                                    {column.headerName}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.map((row) => (
                                            <TableRow key={`row-${row.id}`}>
                                                {columns.map((column) => (
                                                    <TableCell
                                                        key={`cell-${row.id}-${column.field}`}
                                                        align={column.headerAlign}
                                                    >
                                                        {column.renderCell
                                                            ? column.renderCell(row)
                                                            : row[column.field]
                                                        }
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                    {!hiddenPagination && (
                                        <Pagination
                                            handleGetCurrentPage={handleGetCurrentPage}
                                            hasNextPage={hasNextPage}
                                            hasPreviousPage={hasPreviousPage}
                                            pageNumber={page}
                                            isLoading={isLoading}
                                        />
                                    )}
                                </Table>
                            </TableContainer>
                        </Paper>
                    )}

                    {!isLoading && data?.length === 0 && <NoDataOverlay />}
                </div>


            </div>
        </div>
    );
};

export default TableComponent;