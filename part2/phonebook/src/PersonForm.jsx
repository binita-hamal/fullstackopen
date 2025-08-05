import React from "react";

function PersonForm({handleFormSubmit,inputNum,inputText,setInputNum,setInputText}) {
  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Name: </label>
          <input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>

        <div>
          <label>Number: </label>
          <input
            value={inputNum}
            onChange={(e) => setInputNum(e.target.value)}
          />
        </div>

        <div>
          <button>Add</button>
        </div>
      </form>
    </div>
  );
}

export default PersonForm;
