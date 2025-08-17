// import React from "react";

// function Persons({ filterText, filterPeople, persons,handleDelete }) {
  
  


//   return (
//     <div>
//       {(filterText ? filterPeople : persons).map((p) => {
//         return (
         
//             <div key={p.id}>
//               <p style={{ listStyle: "none" }}>
//                 {p.name} {p.number}
//               </p>
//               <button onClick={() => handleDelete(p.id, p.name)}>delete</button>
//             </div>
          
//         );
//       })}
//     </div>
//   );
// }

// export default Persons;



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