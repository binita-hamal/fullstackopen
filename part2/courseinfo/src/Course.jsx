import React from "react";


function Course({ course }) {
    return (
      <>
        {course.map((c) => (
          <>
            <Header name={c.name} />
            <Content parts={c.parts} />
          </>
        ))}
      </>
    );
  }




  function Header({ name }) {
    return (
      <>
        <h1>{name}</h1>
      </>
    );
  }
  
  function Part({ part }) {
    return (
      <>
        <p>
          {part.name} {part.exercises}
        </p>
      </>
    );
  }
  
  function Content({ parts }) {
    const total = parts.reduce((acc, curr) => {
      return acc + curr.exercises;
    }, 0);
  
    return (
      <>
        {parts.map((p) => {
          return <Part part={p} />;
        })}
  
        <p>total of exercises : {total}</p>
      </>
    );
  }

export default Course
export {Part,Header,Content};
