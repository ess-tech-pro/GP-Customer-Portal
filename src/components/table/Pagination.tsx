import TablePagination from '@mui/material/TablePagination';

const PaginationComponent = ({
    pageNumber = 0,
    // setPageNumber,
    hasNextPage,
    hasPreviousPage,
    handleGetCurrentPage,
    isLoading,
}: any) => {
    console.log(pageNumber, hasNextPage, hasPreviousPage, handleGetCurrentPage, isLoading)
    const handleChange = (event, value) => {
        window.scrollTo(0, 0);
        console.log(event, value)
        // setPageNumber(value);
    };

    const handleChangeRowsPerPage = () => { }
    return (
        <TablePagination
            count={100}
            page={10}
            rowsPerPage={10}
            onPageChange={handleChange}
            onRowsPerPageChange={handleChangeRowsPerPage}
            showFirstButton
            showLastButton
        />
    );
};

export default PaginationComponent;