import React from 'react'

function Persons({filterText,filterPeople,persons}) {
  return (
    <div>
       {(filterText ? filterPeople : persons).map((p) => {
            return (
              <p key={p.id} style={{ listStyle: "none" }}>
                {p.name} {p.number}
              </p>
            );
          })}
    </div>
  )
}

export default Persons
