function Header({course}){

  return <>
    <h1>{course}</h1>
  </>
}

// function Content({part,exercises}){
//   return <>
//     <p>{part} {exercises}</p>
//   </>
// }

function Part({part,exercise}){
  return <p>{part} {exercise}</p>

}

function Content({part1,part2,part3,exercises1,exercises2,exercises3}){
  return <>

  <Part part={part1} exercise = {exercises1}/>
  <Part part={part2} exercise = {exercises2}/>
  <Part part={part3} exercise = {exercises3}/>

  </>
}

function Total({exercises1,exercises2,exercises3}){
  return <>
<p>Number of exercises {exercises1+exercises2+exercises3}</p>
  </>
}


function App() {
  // const course = 'Half Stack application development'
  // const part1 = 'Fundamentals of React'
  // const exercises1 = 10
  // const part2 = 'Using props to pass data'
  // const exercises2 = 7
  // const part3 = 'State of a component'
  // const exercises3 = 14
 


  // const course = 'Half Stack application development'
  // const part1 = {
  //   name: 'Fundamentals of React',
  //   exercises: 10
  // }
  // const part2 = {
  //   name: 'Using props to pass data',
  //   exercises: 7
  // }
  // const part3 = {
  //   name: 'State of a component',
  //   exercises: 14
  // }


  // const course = 'Half Stack application development'
  // const parts = [
  //   {
  //     name: 'Fundamentals of React',
  //     exercises: 10
  //   },
  //   {
  //     name: 'Using props to pass data',
  //     exercises: 7
  //   },
  //   {
  //     name: 'State of a component',
  //     exercises: 14
  //   }
  // ]


  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <>
    <Header course ={course.name}/>
    <Content 
     part1 = {course.parts[0].name} exercises1 = {course.parts[0].exercises}
     part2 = {course.parts[1].name} exercises2 = {course.parts[1].exercises}
     part3 = {course.parts[2].name} exercises3 = {course.parts[2].exercises}
     />

    <Total exercises1={course.parts[0].exercises} exercises2={course.parts[1].exercises} exercises3={course.parts[2].exercises}/>
     
    </>
  )
}

export default App
