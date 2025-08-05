import { useState } from "react";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import Filter from "./Filter";


function App() {
  const [persons, setPersons] = useState([
    {
      name: "bini",
      id: 1,
      number: "1213243434",
    },
  ]);

  const [inputText, setInputText] = useState("");
  const [inputNum, setInputNum] = useState("");

  const [filterText, setFilterText] = useState("");

  function handleFormSubmit(e) {
    e.preventDefault();
    let alreadyAdded = persons.filter((p) => p.name === inputText);

    if (alreadyAdded.length > 0) {
      alert(`${inputText} is already added to phonebook`);
    } else {
      let obj = {
        name: inputText,
        id: persons.length + 1,
        number: inputNum,
      };
      setPersons([...persons, obj]);
      setInputText("");
      setInputNum("");
    }
  }

  const filterPeople = persons.filter((p) => {
    return p.name.toLowerCase().includes(filterText.toLowerCase());
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
         />
       
      </div>
    </>
  );
}

export default App;
