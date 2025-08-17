// import { useEffect, useState } from "react";
// import PersonForm from "./PersonForm";
// import Persons from "./Persons";
// import Filter from "./Filter";
// import services from "./services/axios";

// function App() {
//   const [persons, setPersons] = useState([]);
//   const [inputText, setInputText] = useState("");
//   const [inputNum, setInputNum] = useState("");
//   const [filterText, setFilterText] = useState("");

//   useEffect(() => {
//     services.getAll().then((data) => setPersons(data));
//   }, []);

//   function handleDelete(id, name) {
//     if (window.confirm(`Delete ${name} ?`)) {
//       services.remove(String(id)).then(() => {
//         setPersons(prev => prev.filter((p) => String(p.id) !== String(id)));
//       });
//     }
//   }

//   function handleFormSubmit(e) {
//     e.preventDefault();

//     const alreadyExistedPerson = persons.find((p) => p.name === inputText);
//     if (alreadyExistedPerson) {
//       if (
//         window.confirm(
//           `${alreadyExistedPerson.name} is already added to phonebook,replace the old number with a new one?`
//         )
//       ) {
//         const updatePerson = {
//           ...alreadyExistedPerson,
//           number: inputNum,
//         };

//         services.update(alreadyExistedPerson.id, updatePerson).then((per) => {
//           setPersons(persons.map((p) => (String(p.id) === String(alreadyExistedPerson.id) ? per : p)));
//           setInputText("");
//           setInputNum("");
//         });
//       }
//       return;
//     }
  


// // let alreadyAdded = persons.filter((p) => p.name === inputText);

// // if (alreadyAdded.length > 0) {
// //   alert(`${inputText} is already added to phonebook`);
// // } else {
//   let obj = {
//     name: inputText,
//     // id: persons.length + 1,
//     number: inputNum,
//   };
//   // setPersons([...persons, obj]);

//   services.create(obj).then((O) => {
//     setPersons([...persons, O]);
//     setInputText("");
//     setInputNum("");
//   });
// }

// const filterPeople = persons.filter((p) => {
//   return p.name.toLowerCase().includes(filterText.toLowerCase());
// });

// return (
//   <>
//     <div>
//       <h1>Phonebook</h1>

//       <Filter filterText={filterText} setFilterText={setFilterText} />

//       <div>
//         <h1>Add a new</h1>

//         <PersonForm
//           handleFormSubmit={handleFormSubmit}
//           inputText={inputText}
//           setInputText={setInputText}
//           inputNum={inputNum}
//           setInputNum={setInputNum}
//         />
//       </div>

//       <h1>Numbers</h1>

//       <Persons
//         filterText={filterText}
//         filterPeople={filterPeople}
//         persons={persons}
//         setPersons={setPersons}
//         handleDelete={handleDelete}
//       />
//     </div>
//   </>
// );
// }

// export default App;





import { useEffect, useState } from "react";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import Filter from "./Filter";
import '../db.json';
import axios from 'axios'
import service from "./services/axios"

function App() {
  const [persons, setPersons] = useState([]);

  const [inputText, setInputText] = useState("");
  const [inputNum, setInputNum] = useState("");

  const [filterText, setFilterText] = useState("");


  // useEffect(()=>{
  //   axios.get('http://localhost:3001/persons').then(res => setPersons(res.data))

  // },[])

  useEffect(()=>{
    service.getAll().then(res=> setPersons(res.data))
  },[])
 




  function handleFormSubmit(e) {
    e.preventDefault();
    console.log(persons)
    let alreadyAdded = persons.filter((p) => p.name === inputText);

    if (alreadyAdded.length > 0) {
      alert(`${inputText} is already added to phonebook`);
    } else {
      let obj = {
        name: inputText,
        id: persons.length + 1,
        number: inputNum,
      };


     
        // axios.post('http://localhost:3001/persons',obj).then(res=>{
        //   setPersons([...persons,res.data])
        // })
    

        service.create(obj).then(res=>{
          setPersons([...persons,res.data])
        })


       
      
    



      // setPersons([...persons, obj]);
      setInputText("");
      setInputNum("");
    }
  }

  const filterPeople = persons.filter((p) => {
    return p?.name?.toLowerCase().includes(filterText.toLowerCase());
  });

  return (
    <>
      <div>
        <h1>Phonebook</h1>

       <Filter filterText={filterText} 
        setFilterText={setFilterText}
       />

        <div>
          <h1>Add a new</h1>

          <PersonForm handleFormSubmit={handleFormSubmit}
            inputText={inputText}
            setInputText={setInputText}
            inputNum={inputNum}
            setInputNum={setInputNum}
          />
         
        </div>

        <h1>Numbers</h1>
       
         <Persons filterText={filterText} filterPeople={filterPeople}
          persons={persons}
          setPersons={setPersons}
         />
       
      </div>
    </>
  );
}

export default App;