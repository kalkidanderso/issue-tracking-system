import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  TextField,
  Box,
  Typography,
  IconButton
} from '@mui/material';
import {
  FirstPage,
  LastPage,
  NavigateNext,
  NavigateBefore
} from '@mui/icons-material';
import {
  useTable,
  useFilters,
  useGlobalFilter,
  usePagination,
} from 'react-table';

export default function TableSmall({ columns, data }) {
  const defaultColumn = React.useMemo(() => ({}), []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    useFilters,
    useGlobalFilter,
    usePagination
  );

  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <TableContainer>
        <Table {...getTableProps()} sx={{ minWidth: 650 }}>
          <TableHead>
            {headerGroups.map(headerGroup => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <TableCell
                    {...column.getHeaderProps()}
                    sx={{
                      fontWeight: 'bold',
                      width: 170,
                      backgroundColor: 'rgba(0, 0, 0, 0.04)'
                    }}
                  >
                    {column.render('Header')}
                    <div>
                      {column.canFilter ? column.render('Filter') : null}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row, i) => {
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

      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2, 
        mt: 2,
        flexWrap: 'wrap'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            <FirstPage />
          </IconButton>
          <IconButton onClick={() => previousPage()} disabled={!canPreviousPage}>
            <NavigateBefore />
          </IconButton>
          <IconButton onClick={() => nextPage()} disabled={!canNextPage}>
            <NavigateNext />
          </IconButton>
          <IconButton onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            <LastPage />
          </IconButton>
        </Box>

        <Typography>
          Page <strong>{pageIndex + 1} of {pageOptions.length}</strong>
        </Typography>

        <TextField
          type="number"
          defaultValue={pageIndex + 1}
          onChange={e => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(page);
          }}
          sx={{ width: 100 }}
          size="small"
          inputProps={{ min: 1, max: pageOptions.length }}
        />

        <Select
          value={pageSize}
          onChange={e => setPageSize(Number(e.target.value))}
          size="small"
          sx={{ width: 120 }}
        >
          {[5, 10, 20, 30, 40, 50].map(size => (
            <MenuItem key={size} value={size}>
              Show {size}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Paper>
  );
}
