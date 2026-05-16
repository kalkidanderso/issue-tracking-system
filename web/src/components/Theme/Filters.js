import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, usePagination } from 'react-table'
import React, { useState, useEffect, useHistory } from "react";
export function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)


    return (
        <span>
          {/* <label>  Search:{' '}</label> */}
            <input style={{ width: 300, marginLeft: 850 }}
                className="form-control"
                value={value || ""}
                onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`Search`}
            />
              <br />
        </span>
      
    )
}

export function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
}) {
    const count = preFilteredRows.length

    return (
        <input
            className="form-control"
            value={filterValue || ''}
            onChange={e => {
                setFilter(e.target.value || undefined)
            }}
            placeholder={`Search ${count} records...`}
        />
    )
}

// export default Filters;