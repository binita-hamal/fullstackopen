import React from 'react'

function Filter({filterText,setFilterText}) {
  return (
    <div>
       <div>
          filter shown with{" "}
          <input
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>
    </div>
  )
}

export default Filter
