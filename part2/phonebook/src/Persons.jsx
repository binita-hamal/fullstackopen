import React from "react";
import service from "./services/axios";

function Persons({ filterText, filterPeople, persons, setPersons }) {
  function handleDelete(id, name) {
    // let deletePer = persons.filter((per)=> {
    //   if(per.id === id){
    //     window.confirm(`Delete ${per.name} ?`)
    //   }
    // })

    // if(window.confirm(`Delete ${name}`)){
    //   setPersons(persons.filter((per)=> per.id !== id))
    // }

    if (window.confirm(`Delete ${name}`)) {
      service.remove(id).then(() => {
        setPersons(persons.filter((per) => per.id !== id));
      });
    }
  }

  return (
    <div>
      {(filterText ? filterPeople : persons).filter(p=> p && p.id)
      .map((p) => {
        return (
          <p key={p.id} style={{ listStyle: "none" }}>
            {p.name} {p.number}
            <button onClick={() => handleDelete(p.id, p.name)}>delete</button>
          </p>
        );
      })}
    </div>
  );
}

export default Persons;
