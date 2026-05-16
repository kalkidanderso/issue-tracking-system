import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  TextField,
  Box,
  Card,
  CardHeader,
  IconButton,
  InputAdornment,
  Typography,
  Divider
} from '@mui/material';
import {
  Search as SearchIcon,
  FirstPage as FirstPageIcon,
  LastPage as LastPageIcon,
  KeyboardArrowLeft,
  KeyboardArrowRight
} from '@mui/icons-material';
import { useTable, useFilters, useGlobalFilter, usePagination, useSortBy } from 'react-table';

// Custom pagination actions component
function TablePaginationActions({ count, page, rowsPerPage, onPageChange }) {
  const handleFirstPageButtonClick = () => {
    onPageChange(null, 0);
  };

  const handleBackButtonClick = () => {
    onPageChange(null, page - 1);
  };

  const handleNextButtonClick = () => {
    onPageChange(null, page + 1);
  };

  const handleLastPageButtonClick = () => {
    onPageChange(null, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        <FirstPageIcon />
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        <LastPageIcon />
      </IconButton>
    </Box>
  );
}

// Default column filter component
const DefaultColumnFilter = ({
  column: { filterValue, preFilteredRows, setFilter },
}) => {
  return (
    <TextField
      value={filterValue || ''}
      onChange={e => setFilter(e.target.value || undefined)}
      placeholder="Filter..."
      size="small"
      fullWidth
      variant="outlined"
      sx={{ mt: 1 }}
    />
  );
};

export default function EnhancedTable({ columns, data, title="Data Table" }) {
  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
      filter: 'includes'
    }),
    []
  );

  const filterTypes = React.useMemo(
    () => ({
      includes: (rows, id, filterValue) => {
        const v = String(filterValue || '').toLowerCase();
        return rows.filter(row => {
          const rowValue = row.values[id];
          return String(rowValue ?? '').toLowerCase().includes(v);
        });
      },
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
    gotoPage,
    setPageSize,
    preGlobalFilteredRows,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
      initialState: { pageSize: 10 }
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const handleChangePage = (event, newPage) => {
    gotoPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    gotoPage(0);
  };

  return (
    <Card elevation={3}>
      {/* <CardHeader
        title={
          <Typography variant="h5" component="h2">
            {title}
          </Typography>
        }
        action={
          <TextField
            value={state.globalFilter || ''}
            onChange={e => setGlobalFilter(e.target.value)}
            placeholder="Search in all columns..."
            variant="outlined"
            size="small"
            sx={{ width: 300 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        }
      /> */}
      {/* <Divider /> */}
      <TableContainer component={Paper} elevation={0}>
        <Table {...getTableProps()} sx={{ minWidth: 650 }}>
          <TableHead>
            {headerGroups.map(headerGroup => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <TableCell
                    {...column.getHeaderProps()}
                    sx={{
                      fontWeight: 'bold',
                      backgroundColor: 'rgba(0, 0, 0, 0.04)'
                    }}
                  >
                    <Box>
                      <TableSortLabel
                        {...column.getSortByToggleProps()}
                        active={column.isSorted}
                        direction={column.isSortedDesc ? 'desc' : 'asc'}
                      >
                        {column.render('Header')}
                      </TableSortLabel>
                      <div>
                        {column.canFilter ? column.render('Filter') : null}
                      </div>
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row);
              return (
                <TableRow
                  {...row.getRowProps()}
                  hover
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {row.cells.map(cell => (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={data.length}
        rowsPerPage={state.pageSize}
        page={state.pageIndex}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
    </Card>
  );
}
