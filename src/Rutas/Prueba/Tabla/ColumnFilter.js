import React from 'react'

export const ColumnFilter = ({ column }) => {
  const { filterValue, preFilteredRows, setFilter } = column
  const count = preFilteredRows.length
  return (
    <span>
      <input
        style={{width:'90%'}}
        value={filterValue || ''}
        onChange={e => setFilter(e.target.value)}
        placeholder={`Search ${count} records...`}
      />
    </span>
  )
}
