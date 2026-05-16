import {
  useTable,
  useFilters,
  useGlobalFilter,
  usePagination,
} from "react-table";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, Link, withRouter } from "react-router-dom";
import { Modal, Button, Alert, TabContainer } from "react-bootstrap";
import React, { useState, useEffect, useHistory } from "react";
import { DefaultColumnFilter, GlobalFilter } from "./../Theme/Filters.js";
export default function TableSmalls({ columns, data, edit, detail }) {
  const defaultColumn = React.useMemo(
    () => ({
      // Default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
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
    <div>
      {/* <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
            /> */}
      <table
        id="full"
        className="table table-bordered table-hover tableWrapper"
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} style={{ width: 400 }}>
                  {column.render("Header")}
                  {/* Render the columns filter UI */}
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
              {/* <th>Actions</th> */}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            //   console.log("roe", row.original.id);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}

                <td>
                  <span>
                    {/* <Link to={'/'+edit+'/'+row.original.id}
                                         >
                                            <i className="fas fa-edit info" />
                                        </Link>
  &nbsp;
                                        <Link to={'/'+detail+'/'+row.original.id} >
                                            <i className="fas fa-eye success" />
                                        </Link> */}
                    {/* 
                                        <Button
                                            variant="danger"
                                            onClick={() => showDeleteModal(datum.id, datum[firstCol])}
                                            className="btn btn-danger btn-xs"
                                        >
                                            <i className="fas fa-trash" />
                                        </Button> */}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      <div style={{ width: 600, marginLeft: 10 }}>      <ul className="pagination">
                <li className="page-item" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    <a className="page-link">First</a>
                </li>
                <li className="page-item" onClick={() => previousPage()} disabled={!canPreviousPage}>
                    <a className="page-link">{'<'}</a>
                </li>
                <li className="page-item" onClick={() => nextPage()} disabled={!canNextPage}>
                    <a className="page-link">{'>'}</a>
                </li>
                <li className="page-item" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    <a className="page-link">Last</a>
                </li>
                <li>
                    <a className="page-link">
                        Page{' '}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>{' '}
                    </a>
                </li>
                <li>
                    <a className="page-link">
                        <input
                            className="form-control"
                            type="number"
                            defaultValue={pageIndex + 1}
                            onChange={e => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0
                                gotoPage(page)
                            }}
                            style={{ width: '100px', height: '20px' }}
                        />
                    </a>
                </li>{' '}
                <select
                    className="form-control"
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                    style={{ width: '120px', height: '38px' }}
                >
                    {[5, 10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </ul>
            </div>
    </div>
  );
}
