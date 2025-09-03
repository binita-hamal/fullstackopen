import { useEffect, useState } from "react";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import Filter from "./Filter";
import "../db.json";
import service from "./services/axios";
import "./index.css";
import Notification from "./Notification";

function App() {
  const [persons, setPersons] = useState([]);

  const [inputText, setInputText] = useState("");
  const [inputNum, setInputNum] = useState("");

  const [filterText, setFilterText] = useState("");


  const [notification,setNotification] = useState(null)

  // useEffect(()=>{
  //   axios.get('http://localhost:3001/persons').then(res => setPersons(res.data))

  // },[])

  useEffect(() => {
    service.getAll().then((data) => setPersons(data));
  }, []);

  function handleFormSubmit(e) {
    e.preventDefault();

    // console.log(persons)

    // let alreadyAdded = persons.filter((p) => p.name === inputText);

    // if (alreadyAdded.length > 0) {
    //   alert(`${inputText} is already added to phonebook`);
    // }

    const existingPerson = persons.find((p) => p.name === inputText);

    if (existingPerson) {
      const confirmUser = window.confirm(
        `${inputText} is already added to phonebook. Replace the old number with a new one?`
      );

      if (confirmUser) {
        const updatePerson = {
          ...existingPerson,
          number: inputNum,
        };

        service.update(existingPerson.id, updatePerson).then((pe) => {
          setPersons(persons.map((p) => (p.id === existingPerson.id ? pe : p)));
        });

        setInputText("")
        setInputNum("")

      }
    } else {
      let obj = {
        name: inputText,
        // id: persons.length + 1,
        number: inputNum,
      };

      // axios.post('http://localhost:3001/persons',obj).then(res=>{
      //   setPersons([...persons,res.data])
      // })

      service.create(obj).then((res) => {
        setPersons([...persons, res]);


        setNotification(`Added ${inputText}`)

        setTimeout(()=>{

          setNotification(null)

        },5000)

       
      });

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

        <Notification message={notification}/>


        <Filter filterText={filterText} setFilterText={setFilterText} />

        <div>
          <h1>Add a new</h1>

          <PersonForm
            handleFormSubmit={handleFormSubmit}
            inputText={inputText}
            setInputText={setInputText}
            inputNum={inputNum}
            setInputNum={setInputNum}
          />
        </div>

        <h1>Numbers</h1>

        <Persons
          filterText={filterText}
          filterPeople={filterPeople}
          persons={persons}
          setPersons={setPersons}
        />
      </div>
    </>
  );
}

export default App;
